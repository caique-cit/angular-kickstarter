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
          $state.go('private.home');
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

          .state('private.home', {
            url: '/dashboard',
            template: '<tmpl-home></tmpl-home>'
          })

          .state('private.projectEdit', {
            url: '/project/edit/:id',
            template: '<tpl-project></tpl-project>'
          })

          .state('private.projectAdd', {
            url: '/project/new',
            template: '<tpl-project></tpl-project>',
          })

          .state('private.templates', {
            url: '/templates',
            templateUrl: 'components/templates/templates.html',
          })

          .state('private.calculator', {
            url: '/calculator',
            templateUrl: 'components/calculator/calculator.html',
            controller: 'CalculatorController',
            controllerAs: 'calc'
          })

          .state('private.projectDetails', {
            url: '/project/details/:id',
            templateUrl: 'components/project/project-details.html',
            controller: 'ProjectDetailsController',
            controllerAs: 'details',
            params: {
              id: null
            }
          })

          .state('public', {
            url: '',
            templateUrl: 'layout/layout.public.html',
            abstract: true
          })

          .state('public.login', {
            url: '/login',
            templateUrl: 'components/login/login.html',
            controller: 'LoginController',
            controllerAs:'vm',
            data: {
              permissions: {
                except: ['ROLE_USER'],
                redirectTo: 'private.home'
              }
            }
          })

          .state('public.register', {
            url: '/register',
            templateUrl: 'components/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'register',
            data: {
              permissions: {
                except: ['ROLE_USER'],
                redirectTo: 'public.home'
              }
            }
          })

    }
})();
