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
              $state.go('/somestate');
            });

            $stateProvider
                .state('home', {
                    url: '/',
                    template: '<tmpl-home></tmpl-home>',
                    data: {
                        permissions: {
                            only: ['ROLE_USER'],
                            redirectTo: 'login'
                        }
                    }
                })

                .state('quickstart', {
                    url: '/quickstart',
                    template: '<tmpl-quickstart></tmpl-quickstart>'
                })

                .state('edit', {
                    url: '/post/edit/:id',
                    template: '<tpl-post></tpl-post>',
                    data: {
                        permissions: {
                            only: ['ROLE_ADMIN'],
                            redirectTo: 'home'
                        }
                    }
                })

                .state('add', {
                    url: '/post/new',
                    template: '<tpl-post></tpl-post>',
                })

                .state('login', {
                    url: '/login',
                    templateUrl: 'src/framework/login/login.html',
                    controller: 'LoginController',
                    controllerAs:'vm',
                    data: {
                        permissions: {
                            except: ['ROLE_USER'],
                            redirectTo: 'home'
                        }
                    }
                })


    }
})();
