angular
    .module('altairApp')
    .controller('regularCtrl', [
        '$scope',
        '$rootScope',
        '$http',
        '$window',
        '$interval',
        'variables',
        '$interval',
        function ($scope,$rootScope,$http,$window,$interval,variables, $interval) {
            $scope.form = {
                input_d: "Lorem ipsum dolor sit...",
                input_k: "Iste voluptatibus doloribus et ut quibusdam unde asperiores minus aut pariatur deserunt et dolores voluptatum tempore voluptates nesciunt eum deleniti ea voluptas ad possimus amet cupiditate modi eum ullam magnam dolorum facere asperiores quis fuga sint asperiores dolorum rerum adipisci est reprehenderit in magnam."
            };

            $scope.selectize_a_data = {
                options: [
                    {
                        id: 1,
                        title: "Item A1",
                        value: "a1",
                        parent_id: 1
                    },
                    {
                        id: 2,
                        title: "Item B1",
                        value: "b1",
                        parent_id: 1
                    },
                    {
                        id: 3,
                        title: "Item C1",
                        value: "c1",
                        parent_id: 1
                    },
                    {
                        id: 4,
                        title: "Item A2",
                        value: "a2",
                        parent_id: 2
                    },
                    {
                        id: 5,
                        title: "Item B2",
                        value: "b2",
                        parent_id: 2
                    },
                    {
                        id: 6,
                        title: "Item C2",
                        value: "c2",
                        parent_id: 2
                    }
                ]
            };

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

            $scope.selectize_b_options = ["Item A", "Item B", "Item C"];

            $scope.switches = {
                switch_a: 'true',
                switch_d: 'true',
                switch_f: 'true',
                switch_g: 'true',
                switch_h: 'true',
                switch_i: 'true'
            };

            $scope.checkbox_demo_4 = true;

            $scope.login = function(){
                //auth/login
               var dataObj = {
                            'name' : $scope.name,
                            'password' : $scope.password
                };

                var res = $http.post(variables.url + 'auth/login', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $window.sessionStorage.setItem('userId', data['result']);
                       UIkit.modal.alert("It was successful to login");
                   }else{
                       UIkit.modal.alert("Failed to login");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
         
 
            }

            $scope.register = function(){
                //auth/register
               var dataObj = {
                            'name' : $scope.name,
                            'email' : $scope.email,
                            'password' : $scope.password,
                            'placeOfLiving' : 'ulaanbaartar',
                            'longitude' : 110.0,
                            'latitude' : 111.0,
                            'birthday' : new Date('1992-12-28'),
                            'gender' : 'female'
                };

                var res = $http.post(variables.url + 'auth/register', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to register");
                   }else{
                       UIkit.modal.alert("Failed to register");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
         
            }

            $scope.logout = function(){
                //auth/logout
               var res = $http.get(variables.url + 'auth/logout');
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("logout successfully.");
                   }else{
                       UIkit.modal.alert("Failed to get userProfile");
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  
            }
            $scope.getOnlineUserNum = function(){
                //auth/getOnlineUserNum
               var dataObj = {
                };

                var res = $http.post(variables.url + 'auth/getOnlineUserNum', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       //UIkit.modal.alert("OnlineUserNum " + data['result']);
                       $scope.onlineUserNum = data['result'];
                   }else{
                       UIkit.modal.alert("Failed to register");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.updateActivity = function(){
                //auth/update_activity
                var ret =$window.sessionStorage.getItem('userId');
                if (!ret)
                    return;
               var dataObj = {

                };

                var res = $http.post(variables.url + 'auth/update_activity', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        console.log('success update activity');
                   }else{
                       console.log(data['result']);
                   }
                });

                res.error(function(data, status, headers, config) {
                    console.log( "failure message: " + JSON.stringify({data: data}) );
                    //alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.addUserSetting = function(){
                //api/v1/usersettings
                var dataObj = {
                        'userId' : $window.sessionStorage.getItem('userId'),// integer
                        'fullName' : "chimbai",//string(64)
                        'birthday' : new Date('1992-12-28'),//date
                        'gender' : 'male',//  enum(male, female)
                        'phoneNumber' : '0001112220',// string(64)
                        'phoneVerificationCode' : '123',//   string(64)
                        'emailVerificationCode' : '456',//   string(64)
                        'facebook' : true,//    boolean(link, remove link)
                        'twitter' : false,// boolean
                        'google' : false,//  boolean
                        'instagram' : false,//   boolean
                        'pinterest' : false,//   boolean
                        'linkedin' : false,//    boolean
                        'xing' : false,//    boolean
                        'notificationRelease' : false,// boolean
                        'notificationBullseye' : false,//    boolean
                        'notificationPlease' : false,//  boolean
                        'notificationVisitor' : false,// boolean
                        'notificationFavoriteMe' : false,//  boolean
                        'notificationRequestFriend' : false,//   boolean
                        'notificationGift' : false,//   boolean
                        'notificationOther' : false,//   boolean
                        'notificationUserOnline' : false,//  boolean
                        'notificationSound' : false,//   boolean
                        'notificationComments' : false,//    boolean
                        'notificationEvents' : false,//  boolean
                        'notificationNewsletter' : false,//  boolean
                        'mailSettings' : 'newDecision',//    enum   newDecision, deleteAllMsgOfUser, blockUser, noContact
                        'seeRight' : 'noLimitation',//    enum   noLimitation, onlyMembers
                        'allowShareProfile' : false,//   boolean
                        'showDistance' : false,//    boolean
                        'showOnlineStatus' : false,//    boolean
                        'showOnlyLinkedPerson' : false,//    boolean
                        'noShowOnlineStatus' : false,//  boolean
                        'noShowOtherUserProfile' : false,//  boolean
                        'noShowMySuperpower' : false,//  boolean
    
                        'profileLanguage' : 'german',// enum german,english
    
                        'showMyVerifySettings' : false,//    boolean
                        'contactWithVerifyMember' : false,// boolean
                        'pointNum' : 1,//    integer
                        'activateSuperPowers' : false,// boolean
                        'activateVipIPMember' : false//   boolean
                };
                var res = $http.post(variables.url + 'api/v1/usersettings', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       var userSettingId = data['result'];
                       UIkit.modal.alert("It was successful to create UserSetting");
                   }else{
                       UIkit.modal.alert("Failed to create UserSetting");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.getUserSetting = function(){
                //api/v1/usersettings/{id?}
                var res = $http.get(variables.url + 'api/v1/usersettingsFromUserId/' + $window.sessionStorage.getItem('userId'));
                res.success(function(data, status, headers, config) {
                    if(data['success'] == true){
                       $scope.userSetting = data['result'];
                    }else{
                       UIkit.modal.alert("Failed to get UserSetting");
                    }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  
            }
            $scope.updateUserSetting = function(){
                //api/v1/usersettings/{id}
                var dataObj = {
                        'userId' : $window.sessionStorage.getItem('userId'),// integer
                        'fullName' : "chimbai",//string(64)
                        'birthday' : new Date('1992-12-28'),//date
                        'gender' : 'male',//  enum(male, female)
                        'phoneNumber' : '0001112220',// string(64)
                        'phoneVerificationCode' : '123',//   string(64)
                        'emailVerificationCode' : '456',//   string(64)
                        'facebook' : true,//    boolean(link, remove link)
                        'twitter' : false,// boolean
                        'google' : false,//  boolean
                        'instagram' : false,//   boolean
                        'pinterest' : false,//   boolean
                        'linkedin' : false,//    boolean
                        'xing' : false,//    boolean
                        'notificationRelease' : false,// boolean
                        'notificationBullseye' : false,//    boolean
                        'notificationPlease' : false,//  boolean
                        'notificationVisitor' : false,// boolean
                        'notificationFavoriteMe' : false,//  boolean
                        'notificationRequestFriend' : false,//   boolean
                        'notificationGift' : false,//   boolean
                        'notificationOther' : false,//   boolean
                        'notificationUserOnline' : false,//  boolean
                        'notificationSound' : false,//   boolean
                        'notificationComments' : false,//    boolean
                        'notificationEvents' : false,//  boolean
                        'notificationNewsletter' : false,//  boolean
                        'mailSettings' : 'newDecision',//    enum   newDecision, deleteAllMsgOfUser, blockUser, noContact
                        'seeRight' : 'noLimitation',//    enum   noLimitation, onlyMembers
                        'allowShareProfile' : false,//   boolean
                        'showDistance' : false,//    boolean
                        'showOnlineStatus' : false,//    boolean
                        'showOnlyLinkedPerson' : false,//    boolean
                        'noShowOnlineStatus' : false,//  boolean
                        'noShowOtherUserProfile' : false,//  boolean
                        'noShowMySuperpower' : false,//  boolean
    
                        'profileLanguage' : 'german',// enum german,english
    
                        'showMyVerifySettings' : false,//    boolean
                        'contactWithVerifyMember' : false,// boolean
                        'pointNum' : 1,//    integer
                        'activateSuperPowers' : false,// boolean
                        'activateVipIPMember' : false//   boolean
                };
                var res = $http.post(variables.url + 'api/v1/usersettingsFromUserId/' + $window.sessionStorage.getItem('userId'), dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       var userSettingId = data['result'];
                       UIkit.modal.alert("It was successful to update UserSetting");
                   }else{
                       UIkit.modal.alert("Failed to update UserSetting");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.addUserProfile = function(){
                //api/v1/userprofiles
              var dataObj = {
                    'userId': $window.sessionStorage.getItem('userId'),//  integer
                    'logoUrl': 'assets/1.jpg',// text
                    'description': 'adfaf',// text
                    'placeOfLiving': 'ulaanbaartar',//   text
                    'longitude': 100.0,//   double
                    'latitude': 102.0,//    double
                    'gender': 'male',//  enum male, female
                    'startAge': 18,//    integer
                    'endAge': 50,//  integer
                    'relationShipStatus': 'inRelationship',//  enum  
                            //single inRelationship romance married InOpenRelationship complicated
                    'size': 170,//    integer
                    'weight': 78.5,//  double
                    'figure': 'normal',// enum normal,short,tall
                    'eyeColor': 'blue',//    enum blue, brown
                    'hairColor': 'white',//   enum white, brown, black
                    'children': 'yes',//    enum yes no
                    'livingSituation': 'yes',//    enum yes no
                    'smoking': 'yes',//    enum yes no
                    'alcohol': 'yes',//    enum yes no
                    'religion': 'yes',//    enum yes no
                    'education': 'yes',//    enum yes no
                    'profession': 'yes',//    enum yes no
                    'language': 'German',//    enum English, German
                };
                var res = $http.post(variables.url + 'api/v1/userprofiles', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to create userprofile");
                   }else{
                       UIkit.modal.alert("Failed to create userprofile");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.getUserProfile = function(){
                //api/v1/userprofiles/{userId}
              var res = $http.get(variables.url + 'api/v1/userprofilesFromUserId/' + $window.sessionStorage.getItem('userId'));
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.userProfile = data['result'];
                   }else{
                       UIkit.modal.alert("Failed to get UserProfile");
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  
            }
            $scope.updateUserProfile = function(){
                //api/v1/userprofiles/{userId}
              var dataObj = {
                    'userId': $window.sessionStorage.getItem('userId'),//  integer
                    'logoUrl': 'assets/1.jpg',// text
                    'description': 'adfaf',// text
                    'placeOfLiving': 'ulaanbaartar',//   text
                    'longitude': 100.0,//   double
                    'latitude': 101.0,//    double
                    'gender': 'male',//  enum male, female
                    'startAge': 18,//    integer
                    'endAge': 50,//  integer
                    'relationShipStatus': 'inRelationship',//  enum  
                            //single inRelationship romance married InOpenRelationship complicated
                    'size': 170,//    integer
                    'weight': 78.5,//  double
                    'figure': 'normal',// enum normal,short,tall
                    'eyeColor': 'blue',//    enum blue, brown
                    'hairColor': 'white',//   enum white, brown, black
                    'children': 'yes',//    enum yes no
                    'livingSituation': 'yes',//    enum yes no
                    'smoking': 'yes',//    enum yes no
                    'alcohol': 'yes',//    enum yes no
                    'religion': 'yes',//    enum yes no
                    'education': 'yes',//    enum yes no
                    'profession': 'no',//    enum yes no
                    'language': 'German',//    enum English, German
                };
                var res = $http.post(variables.url + 'api/v1/userprofilesFromUserId/' + $window.sessionStorage.getItem('userId'), dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       UIkit.modal.alert("It was successful to update userprofile");
                   }else{
                       UIkit.modal.alert("Failed to update userprofile");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.discoverByCondition = function(){
                // api/v1/environment/discoveruserlist/
                // {myID}/{gender}/{age1}/{age2}/{longitude}/{latitude}/{distance}
                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/environment/discoveruserlist/' + 
                    $window.sessionStorage.getItem('userId') + 
                    '/3' + '/18' + '/25' + '/100.0' + '/102.0' + '/100', 
                    dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       //UIkit.modal.alert("It was successful to save event");
                       var userList = data['result'];
                       //UIkit.modal.alert('age: ' + data['age'] + 'distance' + data['distance']);
                   }else{
                       UIkit.modal.alert("Failed to save event");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.discoverByName = function(){
                var dataObj = {
                         };
                //api/v1/environment/discoveruserlist/{myID}/{name}
                var res = $http.post(variables.url + 'api/v1/environment/discoveruserlist/' + 
                    $window.sessionStorage.getItem('userId') + '/chim', 
                    dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userList = data['result'];
                       //UIkit.modal.alert("It was successful to save event");
                   }else{
                       UIkit.modal.alert("Failed to save event");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                  
            }
            $scope.addContactUser = function(){
                //api/v1/contactusers
                //

                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 2,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/contactusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.addChat = function(){
                //api/v1/chats
               var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'msgType': 'text',
                    'msgContent': 'I am kkk',    

                    'sentTime': new Date(),
                    'maintainSeconds': 100
                };

                var res = $http.post(variables.url + 'api/v1/chats', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.getChatList = function()
            {
               var dataObj = {
                };
                //api/v1/chat/accepteduserlist/{myID}
                var res = $http.post(variables.url + 'api/v1/chat/accepteduserlist/' + $window.sessionStorage.getItem('userId'), dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        $scope.msgUserList = data['result'];


                        //////////////////////////////////////
                        //   unread messages
                        $scope.unreadMessages = "";
                        for (var m = 0; m < $scope.msgUserList.length; m++)
                        {
                           $scope.unreadMessages += 'id: ' + $scope.msgUserList[m].id + 
                                                    ', unreaded: ' + $scope.msgUserList[m].unreadMessageList.length + '\r\n';                                 
                        }
                        ///////////////////////////
                        //
                        if ($scope.toUserId != '')
                        {
                            for (var i = 0; i < $scope.msgUserList.length; i++)
                            {
                                if ($scope.msgUserList[i].id == $scope.toUserId)
                                {   
                                    /////////////////////////////////////////////
                                    // read + unread + mine
                                    var mergeMessages = [];
                                    
                                    for (var x = 0; x < $scope.msgUserList[i].readMessageList.length; x++)
                                    {
                                        mergeMessages.push($scope.msgUserList[i].readMessageList[x]);
                                    }
                                    for (var x = 0; x < $scope.msgUserList[i].unreadMessageList.length; x++)
                                    {
                                        mergeMessages.push($scope.msgUserList[i].unreadMessageList[x]);
                                    }
                                    for (var x = 0; x < $scope.msgUserList[i].myMessageList.length; x++)
                                    {
                                        mergeMessages.push($scope.msgUserList[i].myMessageList[x]);
                                    }
                                    ////////////////////////////////////////////
                                    // sort
                                    function compare(a,b) {
                                      if (a.id < b.id)
                                        return -1;
                                      else if (a.id > b.id)
                                        return 1;
                                      else 
                                        return 0;
                                    }

                                    mergeMessages.sort(compare);

                                    ///////////////////////////////////////////////////
                                    //
                                    $scope.fromChat = '';


                                    for (var k = 0; k < mergeMessages.length; k++)
                                    {
                                        if (mergeMessages[k].fromUserID != $window.sessionStorage.getItem('userId'))
                                            $scope.fromChat += ('[' + $scope.msgUserList[i].name + ']');
                                        else
                                            $scope.fromChat += "[mine]";
                                        $scope.fromChat += ('[' + mergeMessages[k].sentTime + ']:' + mergeMessages[k].msgContent + '\r\n');    
                                    }




                                    break;
                                }
                            }
                        }
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.setReadMessage = function(){
                //api/v1/chats/{id}/read
               var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/chats/' + 1 +'/read', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var messageId = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
            }
            $scope.addFriendUser = function(){
                //api/v1/friendusers
                //

                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/friendusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }            
            $scope.addFriendUser = function(){
                //
                //api/v1/friendusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/friendusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }            
           $scope.addFavoriteUser = function(){
                //api/v1/favoriteusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/favoriteusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }    
          $scope.addVisitorUser = function(){
                //api/v1/visitorusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/visitorusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }           

            $scope.addLikeUser = function(){
                //api/v1/likeusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/likeusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }          

           $scope.addPleasestUser = function(){
                //api/v1/pleasestusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/pleasestusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }           
           $scope.addExplainedFavoriteUser = function(){
                //api/v1/explainedfavoriteusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/explainedfavoriteusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }           
           $scope.addMatchUser = function(){
                //api/v1/matchusers
                var dataObj = {
                    'fromUserID': 1,
                    'toUserID': 3,
                    'startTime': new Date()
                };

                var res = $http.post(variables.url + 'api/v1/matchusers', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }        
           $scope.getFriendUser = function(){
                //api/v1/friends/userlist/{myID}
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/friends/userlist/' + 1, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }        
          $scope.getContactUser = function(){
                //api/v1/yourcontact/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/yourcontact/' + $window.sessionStorage.getItem('userId') + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var result = data['result'];
                        $scope.contactUsers = '';
                        for (var i = 0; i < result.length; i++)
                        {
                            $scope.contactUsers += ('id: ' + result[i].id + ',' + 'name: ' + result[i].name + ", " + 'online status: ' + result[i].on_offline) + '\r\n';
                        }
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }     
             $scope.getFavoriteUser = function(){
                //api/v1/favorite/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/favorite/' + 1 + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }           
            $scope.getVisitorUser = function(){
                //api/v1/visitor/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/visitor/' + 1 + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }           
             $scope.getLikeUser = function(){
                //api/v1/like/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/like/' + 1 + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }                 
           $scope.getPleasestUser = function(){
                //api/v1/pleasest/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/pleasest/' + 1 + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
          $scope.getExplainedFavoriteUser = function(){
                //api/v1/explainedfavorite/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/explainedfavorite/' + 1 + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
          $scope.getMatchUser = function(){
                //api/v1/match/{myID}/userlist
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/match/' + 1 + '/userlist/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
          $scope.getAboutMyProfile = function(){
                //api/v1/about/{myID}/myprofile
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/about/' + 1 + '/myprofile/', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                        var userSetting = data['result1'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
        $scope.eventSearch = function(){
                //api/v1/photo/eventsearch
                var eventDate = new Date("2016-01-20T12:00:00");
                var dataObj = {
                    'name': '',
                    'date': eventDate,
                    'place': '',
                    'pageNumber': 1
                };

                var res = $http.post(variables.url + 'api/v1/photo/eventsearch', dataObj);


                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var events = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
        }
         $scope.getEvent = function(){
                //api/v1/eventphoto/{eventid}
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 2, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.getEventPhoto = function(){
                //api/v1/eventphoto/{eventid}/photos
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 2 + '/photos', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.addAlbumPhotoComment = function(){
                //api/v1/comments
                var dataObj = {
                    'albumPhotoId': 45,//integer
                    'userId':  2,//integer
                    'dateTime': new Date(),//    dateTime
                    'ranking': 1,// integer
                    'content': 'xxxxxx'// text
                };

                var res = $http.post(variables.url + 'api/v1/comments', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.getAlbumPhotoComments = function(){
                //api/v1/eventphoto/{albumphotoid}/comments
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 51 + '/comments', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.getEventPhotographer = function(){
                //api/v1/eventphoto/{eventid}/photographer
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 2 + '/photographer', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }            
            
           $scope.addView = function(){
                //api/v1/eventphoto/{albumphotoid}/addview
                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 51 + '/addview', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }                    
           $scope.addDownload = function(){
                //api/v1/eventphoto/{albumphotoid}/adddownload
                var dataObj = {
                };
                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 51 + '/adddownload', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }   
           $scope.addComment = function(){
                //api/v1/eventphoto/{albumphotoid}/addcomment/{myID}
                var dataObj = {
                    'content': 'dddddd'
                };
                var res = $http.post(variables.url + 'api/v1/eventphoto/' + 51 + '/addcomment/' + 2, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }                    
          $scope.addGallery = function(){
                //api/v1/userGallerys
                var dataObj = {
                    'userId': 2,
                    'url': './uploadFiles/Image06.jpg',
                };
                var res = $http.post(variables.url + 'api/v1/userGallerys', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var userSetting = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }        
            $scope.getUserGallerysOfUser = function(){
                //api/v1/userGallerysOfUser/{userId}
                var res = $http.get(variables.url + 'api/v1/userGallerysOfUser/' + 1);
                res.success(function(data, status, headers, config) {
                    if(data['success'] == true){
                       var kk = data['result'];
                    }else{
                       UIkit.modal.alert("Failed to get gallerys");
                    }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  
            }            
            $scope.sendChat = function(){
                //api/v1/chats
               var dataObj = {
//                    'fromUserID': $window.sessionStorage.getItem('userId'),
                    'toUserID': $scope.toUserId,
                    'msgType': 'text',
                    'msgContent': $scope.chat,    

                    'sentTime': new Date(),
                    'maintainSeconds': 100
                };

                var res = $http.post(variables.url + 'api/v1/chats', dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    

            }
            $scope.toReadMessages = function(){
                //api/v1/chat/toRead/{fromID}
                var dataObj = {

                };

                var res = $http.post(variables.url + 'api/v1/chat/toRead/' + $scope.toUserId, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                    
           }
           $scope.fireKeyEvent = function(){
                //api/v1/chat/fireKeyEvent/{toUserID}
                var dataObj = {
                };

                var res = $http.post(variables.url + 'api/v1/chat/fireKeyEvent/' + $scope.toUserId, dataObj);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                        var id = data['result'];
                   }else{
                       console.log("already exist");//UIkit.modal.alert("already exist");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });                        
           }
           $scope.changed = function($event){
                $scope.fireKeyEvent();
           }
           

           $scope.getKeyEvent = function(){
                if ($scope.toUserId != '')
                {
                    //api/v1/chat/getKeyEvent/{fromUserID}
                    var dataObj = {
                    };

                    var res = $http.post(variables.url + 'api/v1/chat/getKeyEvent/' + $scope.toUserId, dataObj);
                    res.success(function(data, status, headers, config) {
                       if(data['success'] == true){
                            $connect = data['result'];
                            if ($connect == true)
                            {
                                var mm = 0;
                            }
                            $scope.typingStatus = $connect == true ? 'user is typing....' : '';
                       }else{
                           //UIkit.modal.alert("already exist");
                           console.log("no connect");
                       }
                    });

                    res.error(function(data, status, headers, config) {
                        var kk = 0;//alert( "failure message: " + JSON.stringify({data: data}));
                    });                       
                }
           }
            //api/v1/userGallerysOfUser/{userId}
            $scope.post = function(){
                //$scope.getOnlineUserNum();
                //$scope.addUserSetting();
                //$scope.getUserSetting();
                //$scope.updateUserSetting();
                //$scope.addUserProfile();
                //$scope.getUserProfile();
                //$scope.updateUserProfile();
                //$scope.discoverByCondition();
                //$scope.discoverByName();
                //$scope.addContactUser();
                //$scope.addChat();
                //$scope.getChatList();
                //$scope.setReadMessage();
                //$scope.addFriendUser();
                //$scope.addFavoriteUser();
                //$scope.addVisitorUser();
                //$scope.addLikeUser();
                //$scope.addPleasestUser();
                //$scope.addExplainedFavoriteUser();
                //$scope.addMatchUser();
                //$scope.getContactUser();
                //$scope.getFavoriteUser();
                //$scope.getVisitorUser();
                //$scope.getLikeUser();
                //$scope.getPleasestUser();
                //$scope.getExplainedFavoriteUser();
                //$scope.getMatchUser();
                //$scope.getAboutMyProfile();
                //$scope.eventSearch();
                //$scope.getEvent();
                //$scope.getEventPhoto();

                //$scope.getAlbumPhotoComments();
                //$scope.addAlbumPhotoComment();
                //$scope.getEventPhotographer();
                //$scope.addView();
                //$scope.addDownload();
                //$scope.addComment();//=$scope.addAlbumPhotoComment();
                //$scope.getOnlineUserNum();
                //$scope.addGallery();
                //$scope.getUserGallerysOfUser();
            }


            $scope.callAtInterval = function () {
                $scope.updateActivity();
                $scope.getOnlineUserNum();
                $scope.getContactUser();
                $scope.getChatList();
                //$scope.getKeyEvent();
            }
            $scope.toUserId = '';
            $interval($scope.callAtInterval, 1000);

        }
    ]);