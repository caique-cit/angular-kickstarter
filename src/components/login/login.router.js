(function () {
    'use strict';

    angular
        .module('app.login')
        .config(LoginRouter);

        LoginRouter.$inject = ['$stateProvider'];

        function LoginRouter($stateProvider) {

            $stateProvider
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
        }
})();
