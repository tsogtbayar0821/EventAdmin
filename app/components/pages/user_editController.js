angular
    .module('altairApp')
    .controller('user_editCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
        'groups_data',
        '$timeout',
        'products_data',
        '$http',
        'variables',
        '$window',
        function ($rootScope,$scope,user_data,groups_data, $timeout, products_data, $http, variables, $window) {

            // $scope.user_data = user_data[0];
            // $scope.user_data_contacts = user_data[0].contact;
            // $scope.logo_img = "assets/img/blank.png";

            $scope.pageSize = 5;
            // languages
            var langData = $scope.user_languages_options = [
                {id: 1, title: 'English', value: 'gb'},
                {id: 2, title: 'French', value: 'fr'},
                {id: 3, title: 'Chinese', value: 'cn'},
                {id: 4, title: 'Dutch', value: 'nl'},
                {id: 5, title: 'Italian', value: 'it'},
                {id: 6, title: 'Spanish', value: 'es'},
                {id: 7, title: 'German', value: 'de'},
                {id: 8, title: 'Polish', value: 'pl'}
            ];
            $scope.user_languages_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                render: {
                    option: function(langData, escape) {
                        return  '<div class="option">' +
                            '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                            '<span>' + escape(langData.title) + '</span>' +
                            '</div>';
                    },
                    item: function(langData, escape) {
                        return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' + escape(langData.title) + '</div>';
                    }
                },
                valueField: 'value',
                labelField: 'title',
                searchField: 'title',
                create: false,
                placeholder: 'Select Language...'
            };

            // user role
            $scope.user_role_config = {
                valueField: 'value',
                labelField: 'title',
                create: false,
                maxItems: 1,
                placeholder: 'Select...'
            };

            $scope.user_role_options = [
                {
                    "value": "admin",
                    "title": "Admin"
                },
                {
                    "value": "super_admin",
                    "title": "Super Admin"
                },
                {
                    "value": "editor",
                    "title": "Editor"
                },
                {
                    "value": "author",
                    "title": "Author"
                },
                {
                    "value": "none",
                    "title": "None"
                }
            ];

            // groups
            $scope.all_groups = groups_data;

 
 

            // submit button
            $('#user_edit_submit').on('click',function(e) {
                e.preventDefault();
                var data = JSON.stringify($scope.user_data, null, 2),
                    user_name = user_data[0].name;

                UIkit.modal.alert('<p>Data for ' + user_name + ':</p><pre>' + data + '</pre>');
            })
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
                            //$scope.logo_img = data[0];
                            $scope.user_data.logoUrl = data[0];

                            $scope.savePhotographerInfo();    
                        }
                    };

                var select = UIkit.uploadSelect($("#mail_upload-select"), settings),
                    drop   = UIkit.uploadDrop($("#mail_upload-drop"), settings);


                /////////////////////////////////////////////////////
                // multi file upload
                var progressbar_multi = $("#multi_upload_progressbar"),
                    bar_multi         = progressbar_multi.find('.uk-progress-bar'),
                    settings    = {
                        action: './upload/upload.php', // upload url
                        single: false,
                        loadstart: function() {
                            bar_multi.css("width", "0%").text("0%");
                            progressbar_multi.removeClass("uk-hidden uk-progress-danger");
                        },
                        progress: function(percent) {
                            percent = Math.ceil(percent);
                            bar_multi.css("width", percent+"%").text(percent+"%");
                            if(percent == '100') {
                                setTimeout(function(){
                                    progressbar_multi.addClass("uk-hidden");
                                }, 1500);
                            }
                        },
                        error: function(event) {
                            progressbar_multi.addClass("uk-progress-danger");
                            bar_multi.css({'width':'100%'}).text('100%');
                        },
                        abort: function(event) {
                            console.log(event);
                        },
                        complete: function(response, xhr) {
                            var data = JSON.parse(response);

                            for (var i = 0; i < data.length; i++)
                            {
                                var photo = {url: data[i], photographerId: $window.sessionStorage.getItem('id')};
                                $scope.createPhotoInfo(photo);
                            }


                        }
                    };

                var select_1 = UIkit.uploadSelect($("#multi_upload-select"), settings),
                    drop_1   = UIkit.uploadDrop($("#multi_upload-drop"), settings);



            });


            /////////////////////////////////////////
            // get user profile info
            $scope.getPhotographerInfo = function(){
                var res = $http.get(variables.url + 'api/v1/photographers/' + $window.sessionStorage.getItem('id'));
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.user_data = data['result'];
                   }else{
                       UIkit.modal.alert("Failed to get userProfile");
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  
            }
            $scope.getPhotographerInfo();
            ////////////////////////////////////////////////////
            // get photos
            $scope.getPhotos = function($photographerId){
              var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/admincontroller/photos/' + $photographerId, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.user_data_photos = data['result'];
                   }else{
                       UIkit.modal.alert("Failed to get photos");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.getPhotos($window.sessionStorage.getItem('id'));
            ////////////////////////////////////////////////////
            // get friends
            $scope.user_data_friends = 0;

            ////////////////////////////////////////////////////
            // save photographer info

            $scope.savePhotographerInfo = function(){
                var dataObj = {
                    'email' : $scope.user_data.email,
                    'logoUrl' : $scope.user_data.logoUrl,
                    'fullName' : $scope.user_data.fullName,
                    'placeOfLiving' : $scope.user_data.placeOfLiving,

                    'longitude' : $scope.user_data.longitude,
                    'latitude' : $scope.user_data.latitude,
                    'about' : $scope.user_data.about,
                    'phoneNumber': $scope.user_data.phoneNumber,
                    'awardRight': $scope.user_data.awardRight,
                    'startDateTime' : $scope.user_data.startDateTime
                };
                var res = $http.post(variables.url + 'api/v1/photographers/' + $window.sessionStorage.getItem('id'), dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("Success to save photograper info");
                   }else{
                       UIkit.modal.alert("Failed to save photograper info");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            /////////////////////////////////////////////////////////
            // create photo info
            $scope.createPhotoInfo = function(photo){
                var dataObj = {
                    'url' : photo.url,
                    'photographerId' : photo.photographerId,
                };
                var res = $http.post(variables.url + 'api/v1/photolibrarys', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.user_data_photos.push(photo);
                   }else{
                       UIkit.modal.alert(data['result'] + ":" + photo.url);
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }


        }
    ])
;