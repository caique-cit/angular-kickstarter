(function () {
    'use strict';

    angular
        .module('app.quickstart')
        .config(PostRouter);

        PostRouter.$inject = ['$stateProvider'];

        function PostRouter($stateProvider) {

            $stateProvider
                .state('private.edit', {
                    url: '/post/edit/:id',
                    template: '<tpl-post></tpl-post>',
                    data: {
                        permissions: {
                            only: ['ROLE_ADMIN'],
                            redirectTo: 'private.home'
                        }
                    }
                })

                .state('private.add', {
                    url: '/post/new',
                    template: '<tpl-post></tpl-post>',
                })

                .state('private.postList', {
                    url: '/post/list',
                    templateUrl: 'src/components/post/post-table/post-table.html',
                    controller:  'PostListController',
                    controllerAs:'vm'
                });
        }
})();
