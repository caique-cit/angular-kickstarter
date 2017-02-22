(function () {

    'use strict';
    angular.module('app.post')
        .directive('tplPost', directiveFunction)
        .controller('PostController', ControllerFunction);

        directiveFunction.$inject = [];


        function directiveFunction() {

            var directive = {
                restrict: 'E',
                templateUrl: 'components/post/post.html',
                scope: {
                },
                controller: 'PostController',
                controllerAs: 'vm',
                bindToController: true,
            };

            return directive;
        }

        ControllerFunction.$inject = ['PostService', '$location', '$scope', '$stateParams'];

        function ControllerFunction(PostService, $location, $scope, $stateParams) {
            var vm = this;

            init();

            function init() {
                if($stateParams.id) {
                    PostService.getUpdatePost().then(function(dataPost) {
                        $scope.post = dataPost.data;
                    });
                }
            }


            vm.register = function(post) {
                if(post.id) {
                    PostService.updatePost(post).then(function(){

                    }).finally(function() {
                        $location.path('/');
                    });

                } else {

                    PostService.addPosts(post).then(function() {

                    }).finally(function() {
                        $location.path('/');
                    });
                }
            };
        };
})();
