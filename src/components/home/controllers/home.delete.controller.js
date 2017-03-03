(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('DeleteController', DeleteController);

        DeleteController.$inject = ['$scope', 'post', 'HomeService', '$mdDialog'];

        function DeleteController($scope, post, HomeService, $mdDialog) {
            
            var vm = this;
            $scope.post = post;

            vm.remove = function() {

                HomeService.delete($scope.post.id).then(function() {

                }).finally(function() {
                    $scope.$emit('post_update', 1);
                    $mdDialog.hide();
                });
            }

            vm.hideDialog = function() {
                $mdDialog.hide();
            }
        }

})();
