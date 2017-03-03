(function () {
    'use strict';

    angular
        .module('app.home')
        .config(HomeRouter);

        HomeRouter.$inject = ['$stateProvider'];
                
        function HomeRouter($stateProvider) {

            $stateProvider
                .state('private.home', {
                    url: '/dashboard',
                    template: '<tmpl-home></tmpl-home>'
                });
        }
})();
