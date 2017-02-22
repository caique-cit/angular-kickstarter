(function() {
    'use strict';

angular.module('app.core')
  .service('APIInterceptor', ServiceFunction)


  ServiceFunction.$inject = ['$rootScope', 'UserService'];


  function ServiceFunction($rootScope, UserService) {
    var service = this;

    service.request = function(config) {
      var currentUser = UserService.getCurrentUser(),
      access_token = currentUser  ? currentUser.access_token : null;

      if(access_token) {
        config.headers.Authorization = 'Bearer ' + access_token;
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
