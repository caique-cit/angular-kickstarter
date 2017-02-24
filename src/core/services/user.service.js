(function () {

    'use strict';

    angular
        .module('app.core')
        .service('UserService', UserService)

        UserService.$inject = ['$http', 'store', 'PermRoleStore', 'ENDPOINT_URI'];

        function UserService ($http, store, PermRoleStore, ENDPOINT_URI) {

            // service declaration
            let service = this;

            // private attributes
            let currentUser = null,
                path = 'api/token/';

            // public attributes


            // public methods definition
            service.getCurrentUser = getCurrentUser;
            service.login = login;
            service.logout = logout;
            service.register = register;
            service.setCurrentUser = setCurrentUser;

            // public methods implementation
            function getCurrentUser () {
              if(!currentUser) {
                currentUser = store.get('user');
              }
              return currentUser;
            }

            function setCurrentUser (user) {
                let currentUser = user;
                let dataUser = {};

                dataUser.userName = user.username;
                dataUser.accesToken = user.accessToken;

                store.set('user', dataUser);
                return currentUser;
            }

            function login (credentials) {
                return $http.post(_getLogUrl('login'), credentials);
            }

            function logout () {
                store.remove('user');              
            }

            function register (user) {
                return $http.post(_getUrl(), user);
            }

            // private methods implementation
            function _getUrl() {
                return ENDPOINT_URI + path;
            }

            function _getLogUrl(action) {
                return _getUrl() + action;
            }
        }
})();
