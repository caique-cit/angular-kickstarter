(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['logger','HomeService','$mdDialog', '$rootScope', 'PostService'];

        function HomeController (logger, HomeService, $mdDialog, $rootScope, PostService) {
            var vm = this;

            vm.posts = [];
            vm.post = {};
            vm.pager = {};
            vm.isLoading = false;
            vm.pager.itemsPerPage = '12';


            $rootScope.$on('post_update', function(event, data) {
                activate();
            });

            vm.getPosts = function (page) {
                let currentPage = page || 1;
                vm.isLoading = true;

                PostService.getPosts(currentPage, vm.pager.itemsPerPage).then(function(response) {
                    if (response && response.data) {
                        vm.posts = response.data.posts;
                        vm.pager.totalOfPager = response.data.meta.pagination.total_pages;
                        vm.pager.currentPage = response.data.meta.pagination.current_page;
                        vm.isLoading = false;
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

            function _init() {
                vm.getPosts(1);
            }

            _init();
        }
})();
