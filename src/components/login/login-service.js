(function() {

    'use strict';

    angular.module('app.login')
      .service('UserService', ServiceFunction)
      .service('LoginService', LoginServiceFunction);

    ServiceFunction.$inject = ['store'];

    function ServiceFunction(store) {
      var service = this,
          currentUser = null;

      service.setCurrentUser = function(user) {
        currentUser = user;
        delete user.password;

        store.set('user', user);
        return currentUser;
      };

      service.getCurrentUser = function() {
        if(!currentUser) {
          currentUser = store.get('user');
        }
        return currentUser;
      };
    };

    LoginServiceFunction.$inject = ['$http', 'ENDPOINT_URI'];


    function LoginServiceFunction($http, ENDPOINT_URI) {
        var service = this,
            path = 'api/token/';

        function getUrl() {
            return ENDPOINT_URI + path;
        }

        function getLogUrl(action) {
            return getUrl() + action;
        }

        service.login = function(credentials) {
            return $http.post(getLogUrl('login'), credentials);
        };

        service.logout = function() {
            return $http.post(getLogUrl('logout'));
        };

        service.register = function(user) {
            return $http.post(getUrl(), user);
        };
    }

})();
