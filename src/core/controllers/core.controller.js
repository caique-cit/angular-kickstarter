(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('CoreController', CoreController);

        CoreController.$inject = ['$rootScope', 'UserService', 'REFRESH_TOKEN_AUTO'];

        /**
        * @ngdoc controller
        * @name app.core:CoreController
        * @description main controller of the app.
        * it controls global scope features like user logout.
        * and here will be placed all rootScope event handlers
        * @requires $rootScope
        * @requires UserService
        * @requires REFRESH_TOKEN_AUTO
        */
        function CoreController ($rootScope, UserService, REFRESH_TOKEN_AUTO) {
            // controller declaration
            var core = this;

            // public attributes declaration
            core.currentUser = {};

            // public methods declaration
            core.logout = logout;


            function logout() {
                UserService.logout()
                    .then(function(response) {
                        core.currentUser = UserService.setCurrentUser(null);
                    })
                    .catch(function (error) {
                        throw error;
                    })
            }

            /**
            * @ngdoc function
            * @link g.$rootScope.Scope#methods_$on listen
            * @description this listener listen to the 'authorized' event
            * emited by LoginController and set the currentUser info
            */
            $rootScope.$on('authorized', function() {
                core.currentUser = UserService.getCurrentUser();
            });

            /**
            * @ngdoc function
            * @link g.$rootScope.Scope#methods_$on listen
            * @description this listener listen to the 'unauthorized' event
            * emited by CoreInterceptor and calls the UserService method
            * to refresh current user's auth token
            */
            $rootScope.$on('unauthorized', function() {
                if (REFRESH_TOKEN_AUTO) {
                    UserService.refresh({refresh_token: core.currentUser.refreshToken})
                        .then(function (response) {
                            core.currentUser = UserService.setCurrentUser(response.data);
                        })
                        .catch(function (error) {
                            throw error;
                        });
                } else {
                    //TODO: create confirmation modal to refresh option
                }
            });
      }
})();
