angular
    .module('altairApp')
    .controller('loginCtrl', [
        '$scope',
        '$rootScope',
        'utils',
        '$state',
        '$http',
        'variables',
        '$window',
        function ($scope,$rootScope,utils,$state,$http,variables,$window) {

            if ($window.sessionStorage.getItem('id'))
            {
                $window.sessionStorage.removeItem('id');
            }

            $scope.registerFormActive = false;

            var $login_card = $('#login_card'),
                $login_form = $('#login_form'),
                $login_help = $('#login_help'),
                $register_form = $('#register_form'),
                $login_password_reset = $('#login_password_reset');

            // show login form (hide other forms)
            var login_form_show = function() {
                $login_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show register form (hide other forms)
            var register_form_show = function() {
                $register_form
                    .show()
                    .siblings()
                    .hide();
            };

            // show login help (hide other forms)
            var login_help_show = function() {
                $login_help
                    .show()
                    .siblings()
                    .hide();
            };

            // show password reset form (hide other forms)
            var password_reset_show = function() {
                $login_password_reset
                    .show()
                    .siblings()
                    .hide();
            };

            $scope.loginHelp = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,login_help_show,undefined);
            };

            $scope.backToLogin = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = false;
                utils.card_show_hide($login_card,undefined,login_form_show,undefined);
            };

            $scope.registerForm = function($event) {
                $event.preventDefault();
                $scope.registerFormActive = true;
                utils.card_show_hide($login_card,undefined,register_form_show,undefined);
            };

            $scope.passwordReset = function($event) {
                $event.preventDefault();
                utils.card_show_hide($login_card,undefined,password_reset_show,undefined);
            };

            $scope.login = function(){


                var dataObj = {
                        'name' : $scope.login_username,
                        'password' : $scope.login_password
                };  
                var res = $http.post(variables.url + 'photographer/auth/login', dataObj);
                res.success(function(data, status, headers, config) {
                    if(data['success'] == true){
                        $window.sessionStorage.setItem('id', data['result']);
                        $window.sessionStorage.setItem('adminRight', data['result_adminRight']);
                        if (data['result_adminRight'] == true)
                        {
                        //$window.location.href = '/';    
                            $state.transitionTo('restricted.dashboard');                
                        }
                        else
                        {
                            $state.transitionTo('restricted.pages.mailbox');                
                        }
                   }else{
                        UIkit.modal.alert('incorrect name or password!');
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });     

            };
            $scope.signup = function(){
                if ($scope.register_password != $scope.register_password_repeat)
                {
                   UIkit.modal.alert('The password is not same.');     
                   return;
                }
                var dataObj = {
                        'name' : $scope.register_username,
                        'email' : $scope.register_email,
                        'password' : $scope.register_password
                };  
                var res = $http.post(variables.url + 'api/v1/photographers', dataObj);
                res.success(function(data, status, headers, config) {
                    if(data['success'] == true){
                        UIkit.modal.alert('Registered successfully!');
                    }
                    else{
                        UIkit.modal.alert(data['result']);
                    }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                
            }
        }
    ]);


