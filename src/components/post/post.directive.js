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

        ControllerFunction.$inject = ['PostService', '$state', '$location', '$scope', '$stateParams'];

        function ControllerFunction(PostService, $state, $location, $scope, $stateParams) {
            let vm = {
                post: {}
            }

            init();

            function init() {

              if($stateParams.id) {
                _populateViewModel();
              }
            }

            function _populateViewModel() {
                  PostService.getUpdatePost().then(function(dataPost) {
                      vm.post = dataPost.data.data;
                      vm.post.title = vm.post.title;
                      vm.post.slug = vm.post.slug;
                      vm.post.content = vm.post.content;
                  });
            }


            vm.register = function(post) {
                if(post.id) {
                    PostService.updatePost(post).then(function(){

                    }).finally(function() {
                        $state.go('private.home');
                    });

                } else {
                    PostService.addPosts(vm.post).then(function() {

                    }).finally(function() {
                        $state.go('private.home');
                    });
                }
            };

            return vm;
        };
})();
