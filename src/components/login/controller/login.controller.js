(function() {

    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', ControllerFunction);

        ControllerFunction.$inject = [
            '$mdDialog',
            '$firebaseAuth',
            'CoreUserService',
            '$state',
            '$rootScope',
            '$translatePartialLoader'
        ];

        /* @ngInject */
        function ControllerFunction($mdDialog, $firebaseAuth, CoreUserService, $state, $rootScope, $translatePartialLoader) {

            var vm = this;

            var auth = $firebaseAuth();

            vm.password = null;
            vm.username = null;
            vm.handleCancel = handleCancel;
            vm.handleSubmit = handleSubmit;
            vm.fbAuth = fbAuth;
            vm.gPlusAuth = gPlusAuth;

            $translatePartialLoader.addPart('login');

            function fbAuth () {
                auth.$signInWithPopup('facebook')
                .then(function (response) {
                    CoreUserService.setCurrentUser(response.user);
                    $rootScope.$emit('authorized');
                    $state.go('private.home');
                })
                .catch(function (error) {
                    throw error;
                })
            }

            function gPlusAuth () {
                auth.$signInWithPopup('google')
                .then(function (response) {
                    CoreUserService.setCurrentUser(response.user);
                    $rootScope.$emit('authorized');
                    $state.go('private.home');
                })
                .catch(function (error) {
                    throw error;
                })
            }

            function handleSubmit(user) {
                auth.$signInWithEmailAndPassword(user.username, user.password)
                .then(function (user) {
                    CoreUserService.setCurrentUser(user);
                    $rootScope.$emit('authorized');
                    $state.go('private.home');
                })
                .catch(function (error) {
                    throw error;
                });
            }

            function handleCancel() {
                return $mdDialog.hide();
            }
        }

})();
