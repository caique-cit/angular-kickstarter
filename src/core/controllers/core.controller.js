(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('CoreController', CoreController);

        CoreController.$inject = ['$rootScope', 'CoreUserService', 'CoreStore', 'REFRESH_TOKEN_AUTO', 'ENABLE_SECURITY'];

        /**
        * @ngdoc controller
        * @name app.core:CoreController
        * @description main controller of the app.
        * it controls global scope features like user logout.
        * and here will be placed all rootScope event handlers
        * @requires $rootScope
        * @requires CoreUserService
        * @requires REFRESH_TOKEN_AUTO
        * @requires ENABLE_SECURITY
        */
        function CoreController ($rootScope, CoreUserService, CoreStore, REFRESH_TOKEN_AUTO, ENABLE_SECURITY) {
            // controller declaration
            var core = this;

            // public attributes declaration
            core.currentUser = {};

            // public methods declaration
            core.logout = logout;


            function logout() {
                CoreUserService.logout()
                    .then(function(response) {
                        core.currentUser = CoreUserService.setCurrentUser(null);
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
                core.currentUser = CoreUserService.getCurrentUser();
            });

            /**
            * @ngdoc function
            * @link g.$rootScope.Scope#methods_$on listen
            * @description this listener listen to the 'unauthorized' event
            * emited by CoreInterceptor and calls the CoreUserService method
            * to refresh current user's auth token
            */
            $rootScope.$on('unauthorized', function() {
                if (REFRESH_TOKEN_AUTO && ENABLE_SECURITY) {

                    let currentUser = core.currentUser || CoreStore.get('user');

                    CoreUserService.refresh({refresh_token: currentUser.refreshToken})
                        .then(function (response) {
                            core.currentUser = CoreUserService.setCurrentUser(response.data);
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
