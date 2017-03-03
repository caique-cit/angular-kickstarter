(function () {
    'use strict';

    angular
        .module('app.quickstart')
        .config(QuickstartRouter);

        QuickstartRouter.$inject = ['$stateProvider'];

        function QuickstartRouter($stateProvider) {

            $stateProvider
                .state('private.quickstart', {
                    url: '/quickstart',
                    template: '<tmpl-quickstart></tmpl-quickstart>'
                })
        }
})();
