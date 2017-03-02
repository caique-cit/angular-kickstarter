    (function () {

    'use strict';

    angular.module('app.home')
        .directive('tmplHome', directiveFunction)
        .controller('HomeController', ControllerFunction)
        .controller('DeleteController', DeleteControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/home/home.html',
            scope: {
            },
            controller: 'HomeController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','HomeService','$mdDialog', '$rootScope'];

    /* @ngInject */
    function ControllerFunction(logger, HomeService, $mdDialog, $rootScope) {
        var vm = this;
        vm.posts = [];
        vm.post = {};

        activate();

        $rootScope.$on('post_update', function(event, data) {
            activate();
        });

        function activate() {
            logger.log('Activated Home View');

            HomeService.getPosts().then(function(response) {
                if (response && response.data) {
                    vm.posts = response.data.posts;
                }
            });
        }

        vm.showDialog = function(post) {

            $mdDialog.show({
                templateUrl: 'components/home/delete-dialog.html',
                controller: 'DeleteController',
                controllerAs: 'vm',
                 locals : {
                    post : post
                }
            });
        }
    }

    // ----- DeleteFunction -----
    DeleteControllerFunction.$inject = ['$scope', 'post', 'HomeService', '$mdDialog'];

    function DeleteControllerFunction($scope, post, HomeService, $mdDialog) {
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
