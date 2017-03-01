(function() {
    'use strict';

    angular
        .module('app.core')
        .service('CoreInterceptor', CoreInterceptor);

        CoreInterceptor.$inject = ['$rootScope', '$injector'];

        /**
        * @ngdoc service
        * @name app.core:CoreInterceptor
        * @description intercepts all $http requests to get users access and
        * refresh token.
        * It's also used to check integrity of the token by the API.
        * It uses UserService to handle current user information and
        * the $rootScope to emit events about current user's status
        * @requires $rootScope
        * @requires UserService
        * reference: https://docs.angularjs.org/api/ng/service/$http
        */
        function CoreInterceptor($rootScope, $injector) {

            // service declaration
            let service = this;
            let UserService;

            /**
            * @ngdoc function
            * @name app.core:CoreInterceptor#request
            * @description used to get user's access token from current user
            * and sent it as a 'Bearer' header in any $http request.
            * It uses as singleton of UserService to get user information.
            * @param {object} config request configuration object
            * @return {object} config request configuration object with new bearer header
            */
            service.request = function(config) {
                UserService = UserService || $injector.get('UserService');
                let currentUser = UserService.getCurrentUser(),
                accessToken = currentUser ? currentUser.accessToken : null;

                if (accessToken) {
                    config.headers.Authorization = 'Bearer ' + accessToken;
                }

                return config;

            };

            /**
            * @ngdoc function
            * @name app.core:CoreInterceptor#responseError
            * @description this function heandles the response of each $http request
            * searching for errors.
            * It'll emit events for all treated errors
            * @param {object} response resultant object from the $http request
            * @return {object} response resultant object from the $http request
            */
            service.responseError = function(response) {
                if (response.status === 401) {
                    $rootScope.$emit('unauthorized');
                }

              return response;
          };
        }
})();
