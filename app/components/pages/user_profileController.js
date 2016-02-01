angular
    .module('altairApp')
    .controller('user_profileCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
        'variables',
        '$http',
        '$window',
        function ($rootScope,$scope,user_data, variables, $http, $window) {

            // $scope.user_data = user_data[0];
            /////////////////////////////////////////
            // get user profile info
            $scope.getUserProfile = function(){
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
            $scope.getUserProfile();
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
            // get albums
            $scope.getAlbums = function($photographerId){
              var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/admincontroller/albums/' + $photographerId, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.user_data_albums = data['result'];
                   }else{
                       UIkit.modal.alert("Failed to get albums");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.getAlbums($window.sessionStorage.getItem('id'));
            ////////////////////////////////////////////////////
            // get friends
            $scope.user_data_friends = 0;
        }
    ]);