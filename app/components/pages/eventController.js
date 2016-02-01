angular
    .module('altairApp')
    .controller('eventCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        'events',
        'variables',
        '$http',
        '$window',
        function ($rootScope,$scope,$timeout,events,variables,$http,$window) {

            $rootScope.toBarActive = true;

            $scope.events = events;

            for (var i = 0; i < $scope.events.length; i++)
            {
                $scope.events[i].dateTime = new Date($scope.events[i].dateTime);
            }


            var $mailbox = $('#mailbox');

            // select message
            $mailbox
                .on('ifChanged', '.select_message', function() {
                    $(this).is(':checked') ? $(this).closest('li').addClass('md-card-list-item-selected') : $(this).closest('li').removeClass('md-card-list-item-selected');
            });

            // select all messages
            $('#mailbox_select_all').on('ifChanged',function() {
                var $this = $(this);
                $mailbox.find('.select_message').each(function() {
                    $this.is(':checked') ? $(this).iCheck('check') : $(this).iCheck('uncheck');
                })
            });

            // show message details
            $mailbox.on('click', '.md-card-list ul > li', function(e) {

                if ( !$(e.target).closest('.md-card-list-item-menu').length && !$(e.target).closest('.md-card-list-item-select').length ) {

                    var $this = $(this);

                    if (!$this.hasClass('item-shown')) {
                        // get height of clicked message
                        var el_min_height = $this.height() + $this.children('.md-card-list-item-content-wrapper').actual("height");

                        // hide opened message
                        $mailbox.find('.item-shown').velocity("reverse", {
                            begin: function (elements) {
                                $(elements).removeClass('item-shown').children('.md-card-list-item-content-wrapper').hide().velocity("reverse");
                            }
                        });

                        // show message
                        $this.velocity({
                            marginTop: 40,
                            marginBottom: 40,
                            marginLeft: -20,
                            marginRight: -20,
                            minHeight: el_min_height
                        }, {
                            duration: 300,
                            easing: variables.easing_swiftOut,
                            begin: function (elements) {
                                $(elements).addClass('item-shown');
                            },
                            complete: function (elements) {
                                // show: message content, reply form
                                $(elements).children('.md-card-list-item-content-wrapper').show().velocity({
                                    opacity: 1
                                });

                                // scroll to message
                                var container = $('body'),
                                    scrollTo = $(elements);
                                container.animate({
                                    scrollTop: scrollTo.offset().top - $('#page_content').offset().top - 8
                                }, 1000, variables.bez_easing_swiftOut);

                            }
                        });
                    }
                }

            });
            // hide message on: outside click, esc button
            $(document).on('click keydown', function(e) {
                if (
                    ( !$(e.target).closest('li.item-shown').length ) || e.which == 27
                ) {
                    $mailbox.find('.item-shown').velocity("reverse", {
                        begin: function(elements) {
                            $(elements).removeClass('item-shown').children('.md-card-list-item-content-wrapper').hide().velocity("reverse");
                        }
                    });
                }
            });


            $timeout(function() {
                /////////////////////////////////////////////////////
                // file upload
                var progressbar = $("#mail_progressbar"),
                    bar         = progressbar.find('.uk-progress-bar'),
                    settings    = {
                        action: './upload/upload.php', // upload url
                        single: false,
                        loadstart: function() {
                            bar.css("width", "0%").text("0%");
                            progressbar.removeClass("uk-hidden uk-progress-danger");
                        },
                        progress: function(percent) {
                            percent = Math.ceil(percent);
                            bar.css("width", percent+"%").text(percent+"%");
                            if(percent == '100') {
                                setTimeout(function(){
                                    progressbar.addClass("uk-hidden");
                                }, 1500);
                            }
                        },
                        error: function(event) {
                            progressbar.addClass("uk-progress-danger");
                            bar.css({'width':'100%'}).text('100%');
                        },
                        abort: function(event) {
                            console.log(event);
                        },
                        complete: function(response, xhr) {
                            var data = JSON.parse(response);
                            console.log(data[0]);
                            $scope.curEvent.logoUrl = data[0];
                            $scope.saveEvent($scope.curEvent);
                        }
                    };

                var select = UIkit.uploadSelect($("#mail_upload-select"), settings),
                    drop   = UIkit.uploadDrop($("#mail_upload-drop"), settings);

                //////////////////////////////////////////////////////////////////////
                // new event

                var progressbar_1 = $("#photo_upload_progressbar"),
                    bar_1         = progressbar_1.find('.uk-progress-bar'),
                    settings_1    = {
                        action: './upload/upload.php', // upload url
                        single: false,
                        loadstart: function() {
                            bar_1.css("width", "0%").text("0%");
                            progressbar_1.removeClass("uk-hidden uk-progress-danger");
                        },
                        progress: function(percent) {
                            percent = Math.ceil(percent);
                            bar_1.css("width", percent+"%").text(percent+"%");
                            if(percent == '100') {
                                setTimeout(function(){
                                    progressbar_1.addClass("uk-hidden");
                                }, 1500);
                            }
                        },
                        error: function(event) {
                            progressbar_1.addClass("uk-progress-danger");
                            bar_1.css({'width':'100%'}).text('100%');
                        },
                        abort: function(event) {
                            console.log(event);
                        },
                        complete: function(response, xhr) {
                            var data = JSON.parse(response);
                            console.log(data[0]);
                            $scope.newevent.logoUrl = data[0];
                        }
                    };

                var select_1 = UIkit.uploadSelect($("#photo_upload-select"), settings_1),
                    drop_1   = UIkit.uploadDrop($("#photo_upload-drop"), settings_1);
            })
            //////////////////////////////////////////////////////
            // add event
            $scope.addEvent = function(){

                var dataObj = {
                            'name' : $scope.newevent.name,
                            'placeName' : $scope.newevent.placeName,
                            'dateTime' : $scope.newevent.dateTime,
                            'longitude' : 100.01,
                            'latitude' : 100.01,
                            'logoUrl' : $scope.newevent.logoUrl,
                            'tip' : $scope.newevent.tip,
                            'photographerId' : $window.sessionStorage.getItem('id'),
                            'information' : $scope.newevent.information,
                };
                var res = $http.post(variables.url + 'api/v1/events', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to add event");
                        ////////////////////////////////////////////
                        // update events
                        $scope.getAllEvents(); 
                   }else{
                       UIkit.modal.alert("Failed to add event");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                   


            }

            ///////////////////////////////////////////////////////////
            // for select
            $scope.setCurEvent = function(curEvent){
                $scope.curEvent = curEvent;
            }

            ///////////////////////////////////////////////////////////
            // save event
            $scope.saveEvent = function(curEvent){
               var dataObj = {
                            'name' : curEvent.name,
                            'placeName' : curEvent.placeName,
                            'dateTime' : curEvent.dateTime,
                            'longitude' : 100.01,
                            'latitude' : 100.01,
                            'logoUrl' : curEvent.logoUrl,
                            'tip' : curEvent.tip,
                            'photographerId' : $window.sessionStorage.getItem('id'),
                            'information' : curEvent.information,
                };
                var res = $http.post(variables.url + 'api/v1/events/' + curEvent.id, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to save event");
                   }else{
                       UIkit.modal.alert("Failed to save event");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.deleteEvent = function(curEvent){

                var res = $http.delete(variables.url + 'api/v1/events/' + curEvent.id);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to delete event");
                       // update events
                        $scope.getAllEvents();
                   }else{
                       UIkit.modal.alert("Failed to delete event");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });
            }
            $scope.getAllEvents = function(){
               var res = $http.get(variables.url + 'api/v1/eventsByPhotographer/' + $window.sessionStorage.getItem('id'));
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        $scope.events = data['result'];                       
                   }else{
                       UIkit.modal.alert("Failed to get all events");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                       
            }
        }
    ])
;