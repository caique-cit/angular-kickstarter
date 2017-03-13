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
            vm.newUser = false;
            vm.handleCancel = handleCancel;
            vm.handleSubmit = handleSubmit;
            vm.fbAuth = fbAuth;
            vm.gPlusAuth = gPlusAuth;
            
            $translatePartialLoader.addPart('login');

            function signIn(user) {                
                auth.$signInWithEmailAndPassword(user.username, user.password)
                .then(function (user) {
                    CoreUserService.setCurrentUser(user);
                    $state.go('private.home');
                })
                .catch(function (error) {
                    throw error;
                });
            }
            
            function fbAuth () {
                auth.$signInWithPopup('facebook')
                .then(function (response) {
                    CoreUserService.setCurrentUser(response.user);
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
                    $state.go('private.home');
                })
                .catch(function (error) {
                    throw error;
                })
            }

            function register(user) {
                CoreUserService.register(user)
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
