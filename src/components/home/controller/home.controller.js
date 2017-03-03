(function () {

    'use strict';

    angular
        .module('app.post')
        .controller('PostController', PostController);

        PostController.$inject = ['PostService', '$state', '$location', '$scope', '$stateParams'];

        function PostController (PostService, $state, $location, $scope, $stateParams) {
            let vm = {
                post: {},
                register: register
            }

            _init();

            function _init() {

              if ($stateParams.id) {
                _populateViewModel();
              }
            }

            function _populateViewModel () {
                  PostService.getUpdatePost().then(function(dataPost) {
                      vm.post = dataPost.data.data;
                      vm.post.title = vm.post.title;
                      vm.post.slug = vm.post.slug;
                      vm.post.content = vm.post.content;
                  });
            }

            function register (post) {
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
