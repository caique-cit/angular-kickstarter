(function() {
    'use strict';

    angular
        .module('app.core')
        .service('CoreInterceptor', CoreInterceptor)


        CoreInterceptor.$inject = ['$rootScope', '$injector'];


        function CoreInterceptor($rootScope, $injector) {
            let service = this;

            let UserService;

            service.request = function(config) {
                UserService = UserService || $injector.get('UserService');
                let currentUser = UserService.getCurrentUser(),
                accessToken = currentUser ? currentUser.accessToken : null;

                if (accessToken) {
                    config.headers.Authorization = 'Bearer ' + accessToken;
                }

                return config;

            };

            service.responseError = function(response) {
              if(response.status == 401) {
                $rootScope.$broadcast('unauthorized');
              }

              return response;
            }
        };

})();
