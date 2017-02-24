(function() {

    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', ControllerFunction);

        // ----- ControllerFunction -----
        ControllerFunction.$inject = ['$mdDialog', 'UserService', '$state', '$rootScope'];

        /* @ngInject */
        function ControllerFunction($mdDialog, UserService, $state, $rootScope) {

            var vm = this;
            vm.password = null;
            vm.username = null;
            vm.newUser = false;
            vm.handleCancel = handleCancel;
            vm.handleSubmit = handleSubmit;


            function signIn(user) {
                UserService.login(user)
                    .then(function(response) {
                        UserService.setCurrentUser(response.data);
                        $rootScope.$broadcast('authorized');
                        $state.go('private.home');
                    });
            }

            function register(user) {
                UserService.register(user)
                    .then(function(response) {
                        login(user)
                    });
            }

            function handleSubmit(user) {
                vm.newUser ? register(user) : signIn(user);
            }

            function handleCancel() {
                return $mdDialog.hide();
            }
        }

})();
