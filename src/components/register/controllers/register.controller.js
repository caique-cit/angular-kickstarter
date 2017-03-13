(function() {

    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

        RegisterController.$inject = [
            '$mdDialog',
            '$firebaseAuth',
            'CoreUserService', 
            '$state', 
            '$rootScope',
            '$translatePartialLoader',
            '$scope'
        ];

        /* @ngInject */
        function RegisterController ($mdDialog, $firebaseAuth, CoreUserService, $state, $rootScope, $translatePartialLoader, $scope) {

            var vm = this;
           
            var auth = $firebaseAuth();
            
            vm.password = null;
            vm.username = null;            
            vm.handleCancel = handleCancel;
            vm.handleSubmit = handleSubmit;
            
            $translatePartialLoader.addPart('register');            

            function handleSubmit(user) {
                if (user) {
                    auth.$createUserWithEmailAndPassword(user.username, user.password)
                    .then(function(response) {
                        
                        registerForm.username.$setValidity('already-in-use', true);
                        console.log(response);
                    })
                    .catch(function(error) {
                        if (error.code && error.code === "auth/email-already-in-use") {
                            $scope.registerForm.username.$setValidity('alreadyInUse', false);
                        } else {
                            throw error;
                        }                        
                    })
                }
            }
            
            $scope.$watch('registerForm', function () {
                if ($scope.registerForm.username) {
                    $scope.registerForm.username.$setValidity('alreadyInUse', true);
                }
            })

            function handleCancel() {
                return $mdDialog.hide();
            }
            
            function _init () {
                
            }
            
            _init();
        }

})();