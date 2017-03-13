(function () {
    'use strict';

    angular
        .module('app.register')
        .config(RegisterRouter);

        RegisterRouter.$inject = ['$stateProvider'];

        function RegisterRouter($stateProvider) {

            $stateProvider
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