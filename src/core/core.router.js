  (function () {
    'use strict';

    angular
        .module('app.core')
        .config(configFunction);

        configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$injector'];

        /* @ngInject */
        function configFunction($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $injector) {

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise( function($injector) {
              var $state = $injector.get("$state");
              $state.go('public.welcome');
            });

            $stateProvider
                .state('private', {
                    url: '',
                    templateUrl: 'layout/layout.private.html',
                    abstract: true,
                    controller: 'CoreController',
                    controllerAs: 'core',
                    data: {
                        permissions: {
                            only: ['ROLE_USER'],
                            redirectTo: 'public.login'
                        }
                    }
                })

                .state('public', {
                    url: '',
                    templateUrl: 'layout/layout.public.html',
                    abstract: true
                })


                .state('public.welcome', {
                    url: '/welcome',
                    templateUrl: 'components/landingpage/index.html'
                })


    }
})();
