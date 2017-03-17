(function () {
    'use strict';

    angular
        .module('app.project')
        .config(ProjectRouter);

        ProjectRouter.$inject = ['$stateProvider'];

        function ProjectRouter($stateProvider) {

            $stateProvider
                .state('private.projectEdit', {
                    url: '/project/edit/:id',
                    template: '<tpl-project></tpl-project>'
                })

                .state('private.projectAdd', {
                    url: '/project/new',
                    template: '<tpl-project></tpl-project>',
                })

                .state('private.projectDetails', {
                    url: '/project/details/:id',
                    templateUrl: 'components/project/project-details.html',
                    params: {
                        id: null
                    }
                })
        }
})();
