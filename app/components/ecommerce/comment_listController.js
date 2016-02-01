angular
    .module('altairApp')
    .controller('comment_listCtrl', [
        '$scope',
        '$rootScope',
        'products_data',
        '$http',
        'variables',
        '$window',
        function ($scope,$rootScope,products_data,$http,variables,$window) {
            $scope.getComments = function(){
               var res = $http.get(variables.url + 'api/v1/commentsAll/info');
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                       $scope.products_data = data['result'];
                   }else{
                       UIkit.modal.alert("Failed to get userProfile");
                   }
                });
                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });  

            }
            $scope.getComments();
            // // products data
            // $scope.products_data = products_data;

            $scope.pageSize = 10;

            $scope.filter_status_options = [
                {
                    value: '',
                    title: 'All'
                },
                {
                    value: 'in_stock',
                    title: 'In stock'
                },
                {
                    value: 'out_of_stock',
                    title: 'Out of stock'
                },
                {
                    value: 'ships_3_5_days',
                    title: 'Ships in 3-5 days'
                }
            ];

            $scope.filter_status_config = {
                create: false,
                valueField: 'value',
                labelField: 'title',
                placeholder: 'Status...'
            };

            $scope.filterData = {
                status: ["in_stock","out_of_stock","ships_3_5_days"]
            };

            $scope.filter_pageSize = ['5', '10', '15'];
            $scope.removeCommentFromDB = function(commentId, index)
            {
                //delete api/v1/comments/{id}
                var res = $http.delete(variables.url + 'api/v1/comments/' + commentId);
                res.success(function(data, status, headers, config) {
                   if(data['success'] == true){
                    {
                       //UIkit.modal.alert("Removed the photo successfully"); 
                       $scope.products_data.splice(index, 1);
                    }
                   }else{
                       UIkit.modal.alert("Failed to get temp album");
                   }
                });

                res.error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}));
                });
            }
            $scope.removeComment = function(product){
                if ($window.sessionStorage.getItem('adminRight') == true)
                {//In case admin
                    UIkit.modal.confirm('Are you sure you want to delete this user?', function(){
                        for (var i = 0; i < $scope.products_data.length; i++)
                        {
                           if (product.id == $scope.products_data[i].id)
                           {
                                $scope.removeCommentFromDB(product.id, i);
                                break;
                           }
                        }
                    }, {
                        labels: {
                            'Ok': 'Delete'
                        }
                    });                
                }
            }

            // for (var i = 0; i < $scope.products_data.length; i++)
            // {
            //    $scope.products_data[i].image = "./assets/img/gallery/Image17.jpg";
            // }
        }
    ])
;
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};