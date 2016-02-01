angular
    .module('altairApp')
    .factory('albumShare', function(){
        return { albums: [] };
    })
    .controller('albumCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        'invoices_data',
        '$stateParams',
        '$timeout',
        'products_data',
        '$http',
        'variables',
        '$window',
        'albumShare',
        function ($scope,$rootScope,utils,invoices_data,
                $stateParams,$timeout, products_data, $http, 
                variables, $window, albumShare) {
            $scope.albumShare = albumShare;


            $rootScope.page_full_height = true;
            $rootScope.headerDoubleHeightActive = true;

            $scope.invoices_data = invoices_data;
            $scope.logo_img = './assets/img/avatars/user.png';

            $scope.selectize_a_data = {options: []};

            // $scope.getMonth = function(invoice, $index) {
            //     var prev_date = $scope.invoices_data[$index-1],
            //         this_date = invoice.date;
            //     if(prev_date) {
            //         return moment(new Date(this_date)).format('MM') !== moment(new Date(prev_date.date)).format('MM')
            //     } else if($index == 0) {
            //         return true;
            //     }
            // };

            // invoice details
            //$scope.albumId = $stateParams.invoiceId;
            // $scope.invoice = utils.findByItemId($scope.invoices_data, $stateParams.invoiceId);

            // if($scope.invoice) {

            //     $scope.invoice_dueDate = moment( new Date($scope.invoice.date) ).add($scope.invoice.due_date,'days').format('MM.DD.YYYY');

            //     // calculate total value
            //     $scope.invoice_total = function() {
            //         var services = $scope.invoice.services,
            //             services_length = services.length,
            //             total_value = 0;
            //         for($i=0;$i<services_length;$i++) {
            //             var service_rate = services[$i].rate,
            //                 service_hours = services[$i].hours,
            //                 service_tax = services[$i].tax;

            //             total_value += (service_rate * service_hours) + ((service_tax/100) * (service_rate * service_hours))
            //         }
            //         return total_value;
            //     };

            //     // calculate total tax
            //     $scope.invoice_total_tax = function() {
            //         var services = $scope.invoice.services,
            //             services_length = services.length,
            //             total_tax = 0;
            //         for($i=0;$i<services_length;$i++) {
            //             var service_rate = services[$i].rate,
            //                 service_hours = services[$i].hours,
            //                 service_tax = services[$i].tax;

            //             total_tax += ( (service_tax/100) * (service_rate * service_hours) )
            //         }
            //         return total_tax;
            //     };

            // }

            // new invoice
            $scope.invoiceData = {
                services: [
                    {
                        id: 1,
                        service_total: 0
                    }
                ]
            };
            //////////////////////////////////////////////
            //
            $scope.deleteTempAlbum = function(){
                    //api/v1/admincontroller/albums/{photographerid}/tempDelete
                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/admincontroller/albums/' + $window.sessionStorage.getItem('id') + '/tempDelete', dataObj);
                res.success(function(data, status, headers, config) {
                    if(data['success'] == true){
                       var kk = 0;//UIkit.modal.alert("It was successful to delete the content of the temp album");
                       $scope.createTempAlbum();
                    }else{
                       UIkit.modal.alert("Failed to delete the content of the temp album");
                    }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            //////////////////////////////////////////////
            // add new album
            $scope.addAlbum = function() {
                if ($scope.tempAlbum.name == '')
                {
                    UIkit.modal.alert("Please enter the name.");
                    return;
                }
                /////////////////////////////////////
                // create album info
                //
                var curEvent = null;
                for (var i = 0; i < $scope.selectize_a_data.options.length; i++)
                {
                    if ($scope.selectize_a_data.options[i].value == $scope.selectize_a)
                    {
                        curEvent = $scope.events[i];
                        break;
                    }
                }

                if (curEvent == null)
                    return;
                var dateTime = new Date();
                var dataObj = {
                    'name': $scope.tempAlbum.name,
                    'photographerId': $window.sessionStorage.getItem('id'),
                    'eventId': curEvent.id,
                    'logoUrl': $scope.tempAlbum.logoUrl,
                    'category': $scope.tempAlbum.category,
                    'tip': $scope.tempAlbum.tip,
                    'dateTime': dateTime
                };
                var res = $http.post(variables.url + 'api/v1/albums', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        //UIkit.modal.alert("added the album successfully.");
                        //////////////////////////////////////////////
                        // create albumphoto info
                        for (var i = 0; i < $scope.albumPhotoInfos.length; i++)
                        {
                           var albumphotoInfo = $scope.albumPhotoInfos[i];
                           var dataObj1 = {
                                'photolibraryId': albumphotoInfo.photolibraryId,
                                'albumId': data['result'],//new album id
                                'title': albumphotoInfo.title,
                                'viewNumber': albumphotoInfo.viewNumber,
                                'downloadNumber': albumphotoInfo.downloadNumber,
                                'description': albumphotoInfo.description
                            };


                            var res1 = $http.post(variables.url + 'api/v1/albumphotos', dataObj1);
                            res1.success(function(data, status, headers, config) {
                               if(data['success'] == true){
                                    var k = 0;//UIkit.modal.alert("added the albumphoto successfully.");
                               }else{
                                    UIkit.modal.alert("Failed to add the albumphoto");
                               }
                            });

                            res1.error(function(data, status, headers, config) {
                                alert( "failure message: " + JSON.stringify({data: data}));
                            });              
                        }

                        ///////////////////////////////////////////////////////
                        // delete the content of temp album
                        $scope.deleteTempAlbum();
                        ///////////////////////////////////////////////////////
                        // reload albums
                        $scope.getAllAlbums();
                        //UIkit.modal.alert("added the album successfully.");

                   }else{
                        UIkit.modal.alert("Failed to add the album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                           


            };

            // calculate total value
            $scope.setTotal = function(service){
                if(service.service_rate && service.service_hours && service.service_tax) {
                    return service.service_total = ( (service.service_rate * service.service_hours) + ((service.service_tax/100) * (service.service_rate * service.service_hours)) ).toFixed(2)
                }
            };

            $('#invoice_submit').on('click',function(e) {
                // e.preventDefault();
                // var data = JSON.stringify($scope.invoiceData, null, 2);
                // UIkit.modal.alert('<p>Invoice data:</p><pre>' + data + '</pre>');
            })

            /////////////////////////////////////////////////////////////////
            // get all events
            $scope.getAllEvents = function(){
               var res = $http.get(variables.url + 'api/v1/events');
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        $scope.events = data['result'];                       
                        $scope.selectize_a_data = {options: []};
                        for (var i = 0; i < $scope.events.length; i++)
                        {
                            var option = {id: i+1, title: $scope.events[i].name, value: i + "1", parent_id: 1};
                            $scope.selectize_a_data.options.push(option);
                        }
                        if ($scope.selectize_a_data.options.length > 0)
                            $scope.selectize_a = $scope.selectize_a_data.options[0].value;
                   }else{
                        UIkit.modal.alert("Failed to get all events");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                       
            }
            ///////////////////////////////////////////////////////////////////
            // get all photos from photolibrary
            $scope.getAllPhotos = function(){

                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/admincontroller/photos/' + $window.sessionStorage.getItem('id'), dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        $scope.photos = data['result'];
                   }else{
                        UIkit.modal.alert("Failed to get all photos");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            ///////////////////////////////////////////////////////////////////
            // create album photo
            $scope.createAlbumPhoto = function(photo){

                if (typeof $stateParams.invoiceId != 'undefined')
                    photo.albumId = $scope.album.id;//detail
                else
                    photo.albumId = $scope.tempAlbum.id;//add
                photo.title = '...'; 
                photo.viewNumber = 0;
                photo.downloadNumber = 0;
                photo.description = '...';
                var dataObj = {
                    'photolibraryId': photo.id,
                    'albumId': photo.albumId,                    
                    'title': photo.title,
                    'viewNumber': photo.viewNumber,
                    'downloadNumber': photo.downloadNumber,
                    'description': photo.description
                };
                var res = $http.post(variables.url + 'api/v1/albumphotos', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){

                        ////////////////////////////////////////////////
                        // add photo to albumphoto, albumphotoinfo, albumphotourl
                        var object = {'photolibraryId': $window.sessionStorage.getItem('id'),
                            'albumId': photo.albumId,                    
                            'title': photo.title,
                            'viewNumber': photo.viewNumber,
                            'downloadNumber': photo.downloadNumber,
                            'description': photo.description,
                            'url': photo.url
                        };
                        $scope.albumPhotos.push(object);
                        var infoObject = {
                            'id': data['result'],
                            'photolibraryId': photo.id,
                            'albumId': photo.albumId,                    
                            'title': photo.title,
                            'viewNumber': photo.viewNumber,
                            'downloadNumber': photo.downloadNumber,
                            'description': photo.description                     
                        };
                        $scope.albumPhotoInfos.push(infoObject);
                        $scope.albumPhotoUrls.push(photo);

                   }else{
                        //UIkit.modal.alert("Failed to get all photos");
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });   
            }
            ///////////////////////////////////////////////////////////////////
            //
            $scope.getAllAlbumPhotos = function(id){
                if (typeof $stateParams.invoiceId != 'undefined' &&
                    id != $stateParams.invoiceId)
                {// In detail case, except for temp album
                    return;
                }
                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/admincontroller/albumPhotos/' + id, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        $scope.albumPhotoInfos = data['result'];
                        $scope.albumPhotoUrls = data['result_url'];

                        $scope.albumPhotos = new Array();
                        for (var i = 0; i < $scope.albumPhotoInfos.length; i++)
                        {
                            var object = {'photolibraryId': $scope.albumPhotoInfos[i].photolibraryId, 
                                        'albumId': $scope.albumPhotoInfos[i].albumId,
                                        'title': $scope.albumPhotoInfos[i].title,
                                        'viewNumber': $scope.albumPhotoInfos[i].viewNumber,
                                        'downloadNumber': $scope.albumPhotoInfos[i].downloadNumber,
                                        'description': $scope.albumPhotoInfos[i].description,
                                        'url': $scope.albumPhotoUrls[i].url
                                    };
                            $scope.albumPhotos.push(object);
                        }

                   }else{
                        UIkit.modal.alert("Failed to get all photos");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            ///////////////////////////////////////////////////////////////////
            // create temp album
            $scope.createTempAlbum = function(){
                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/admincontroller/albums/' + $window.sessionStorage.getItem('id') + '/temp', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        $scope.tempAlbum = data['result'];
                        $scope.tempAlbum.name = "";
                        $scope.getAllAlbumPhotos($scope.tempAlbum.id);    
                   }else{
                       UIkit.modal.alert("Failed to get tsemp album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            ///////////////////////////////////////////////////////////////////
            // for select
            // $scope.selectize_a_data = {
            //     options: [
            //         {
            //             id: 1,
            //             title: "Event 1",
            //             value: "a1",
            //             parent_id: 1
            //         },
            //         {
            //             id: 2,
            //             title: "Event 2",
            //             value: "b1",
            //             parent_id: 1
            //         },
            //         {
            //             id: 3,
            //             title: "Event 3",
            //             value: "c1",
            //             parent_id: 1
            //         },
            //         {
            //             id: 4,
            //             title: "Event 4",
            //             value: "a2",
            //             parent_id: 2
            //         },
            //         {
            //             id: 5,
            //             title: "Event 5",
            //             value: "b2",
            //             parent_id: 2
            //         },
            //         {
            //             id: 6,
            //             title: "Evnet 6",
            //             value: "c2",
            //             parent_id: 2
            //         }
            //     ]
            // };

            ////////////////////////////////////////////////
            // delete photo from albumphoto
            $scope.deleteAlbumPhotoInfo = function(id, index){
                var res = $http.delete(variables.url + 'api/v1/albumphotos/' + id);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                    {
                       UIkit.modal.alert("Removed the photo successfully"); 
                       $scope.albumPhotos.splice(index, 1);
                       $scope.albumPhotoInfos.splice(index, 1);
                       $scope.albumPhotoUrls.splice(index, 1);
                    }
                   }else{
                       UIkit.modal.alert("Failed to get tsemp album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            /////////////////////////////////////////////////////////
            // remove & edit
            $scope.removePhoto = function(albumPhoto){
                for (var i = 0; i < $scope.albumPhotos.length; i++)
                {
                    if ($scope.albumPhotos[i].url == albumPhoto.url)
                    {
                        $scope.deleteAlbumPhotoInfo($scope.albumPhotoInfos[i].id, i);
                        break;
                    }
                }
            };


            //////////////////////////////////////////////////
            // edit photo info

            $scope.updatePhotoInfo = function(index){
              var dataObj = {
                    'photolibraryId': $scope.albumPhotoInfos[index].photolibraryId,
                    'albumId': $scope.albumPhotoInfos[index].albumId,
                    'title': $scope.title,
                    'viewNumber': $scope.albumPhotoInfos[index].viewNumber,
                    'downloadNumber': $scope.albumPhotoInfos[index].downloadNumber,
                    'description': $scope.description
                };
                var res = $http.post(variables.url + 'api/v1/albumphotos/' + $scope.albumPhotoInfos[index].id, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("Update the photo info successfully"); 
                        // update for view
                        $scope.albumPhotos[index].title = $scope.title;
                        $scope.albumPhotos[index].description = $scope.description;
                        // update photo info    
                        $scope.albumPhotoInfos[index].title = $scope.title;
                        $scope.albumPhotoInfos[index].description = $scope.description;
                   }else{
                       UIkit.modal.alert("Failed to get tsemp album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }

            $scope.setCurPhoto = function(albumPhoto){
                $scope.curPhoto = albumPhoto;
                //product.description = $scope.description;
            };


            $scope.edit = function(){
                for (var i = 0; i < $scope.albumPhotos.length; i++)
                {
                    if ($scope.albumPhotos[i].url == $scope.curPhoto.url)
                    {
                        $scope.updatePhotoInfo(i);
                        break;
                    }
                }
            };


            /////////////////////////////////////////////////////////
            //
            $scope.selectize_a_config = {
                create: false,
                maxItems: 1,
                placeholder: 'Select...',
                optgroupField: 'parent_id',
                optgroupLabelField: 'title',
                optgroupValueField: 'ogid',
                valueField: 'value',
                labelField: 'title',
                searchField: 'title'
            };

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
                            if (typeof $stateParams.invoiceId != 'undefined')
                                $scope.album.logoUrl = data[0];
                            else
                                $scope.tempAlbum.logoUrl = data[0];
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

                            ////////////////////////////////////////
                            // add all of new photos
                            for (var i = 0; i < data.length; i++)
                            {
                                $scope.addPhotoToPhotoLibrary(data[i]);
                            }
                        }
                    };

                var select_1 = UIkit.uploadSelect($("#multi_upload-select"), settings),
                    drop_1   = UIkit.uploadDrop($("#multi_upload-drop"), settings);

            });
            /////////////////////////////////////////////////////////////
            // add photo to photolibrary
            $scope.addPhotoToPhotoLibrary = function(url){
                var dataObj = {
                    'url' : url,
                    'photographerId' : $window.sessionStorage.getItem('id')
                };
                var res = $http.post(variables.url + 'api/v1/photolibrarys', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var object = {'id': data['result'], 'url': url, 'photographerId': $window.sessionStorage.getItem('id')};
                        $scope.photos.push(object);
                   }else{
                        //UIkit.modal.alert("Failed to save event");
                        UIkit.modal.alert(data['result']);
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            /////////////////////////////////////////////////////////////
            //
            $scope.getAllAlbums = function(){
                var dataObj = {
                };                
               var res = $http.post(variables.url + 'api/v1/admincontroller/albums/' + $window.sessionStorage.getItem('id') + '/allexceptfortemp', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.albumShare.albums = data['result'];
                       if (typeof $stateParams.invoiceId != 'undefined')
                       {// detail
                           $scope.albumId = $stateParams.invoiceId;
                           for (var i = 0; i < $scope.albumShare.albums.length; i++)
                           {
                                if ($scope.albumShare.albums[i].id == $scope.albumId)
                                {
                                    $scope.album = $scope.albumShare.albums[i];
                                    break;
                                }
                           }
                       }
                   }else{
                       var k = 0;//UIkit.modal.alert(data['result']);
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  

            }
            /////////////////////////////////////////////////////////////
            //
            $scope.addPhotoToAlbum = function(photo){
                $scope.createAlbumPhoto(photo);
            }


            $scope.getAllEvents();
            $scope.getAllPhotos();
            $scope.createTempAlbum();
            $scope.getAllAlbums();


            //////////////////////////////////////////////////////////////////
            // detail
            
            if (typeof $stateParams.invoiceId != 'undefined')
            {
                $scope.albumId = $stateParams.invoiceId;
                $scope.getAllAlbumPhotos($scope.albumId);
            }
            $scope.saveAlbum = function(){
              var dataObj = {
                    'name': $scope.album.name,
                    'photographerId': $scope.album.photolibraryId,
                    'eventId': $scope.album.eventId,
                    'logoUrl': $scope.album.logoUrl,
                    'category': $scope.album.category,
                    'tip': $scope.album.tip,
                };
                var res = $http.post(variables.url + 'api/v1/albums/' + $scope.album.id, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to update album");
                   }else{
                       UIkit.modal.alert("Failed to update album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.removeAlbum = function(){
                var res = $http.post(variables.url + 'api/v1/admincontroller/albums/' + $scope.album.id + '/delete');
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       //UIkit.modal.alert("It was successful to delete album");
                       $scope.getAllAlbums();
                       var kk = 0;
                   }else{
                       UIkit.modal.alert("Failed to delete album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                         
            }
        }
    ]);