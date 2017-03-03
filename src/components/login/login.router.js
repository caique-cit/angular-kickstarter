(function () {
    'use strict';

    angular
        .module('app.quickstart')
        .config(LoginRouter);

        LoginRouter.$inject = ['$stateProvider'];

        function LoginRouter($stateProvider) {

            $stateProvider
            .state('public.login', {
                url: '/login',
                templateUrl: 'src/components/login/login.html',
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
