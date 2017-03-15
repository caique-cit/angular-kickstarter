(function() {

    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

        RegisterController.$inject = [
            '$mdDialog',
            '$mdToast',
            '$firebaseAuth',
            'CoreUserService', 
            '$state', 
            '$rootScope',
            '$translatePartialLoader',
            '$scope'
        ];

        /* @ngInject */
        function RegisterController ($mdDialog,
                                      $mdToast,
                                      $firebaseAuth, 
                                      CoreUserService, 
                                      $state, 
                                      $rootScope, 
                                      $translatePartialLoader, 
                                      $scope) {

            var vm = this;
           
            var auth = $firebaseAuth();
            
            vm.password = null;
            vm.confirmPassword = null;
            vm.username = null;            
            vm.handleCancel = handleCancel;
            vm.handleSubmit = handleSubmit;
            
            $translatePartialLoader.addPart('register');            

            function handleSubmit(user) {
                if (user) {
                    auth.$createUserWithEmailAndPassword(user.username, user.password)
                    .then(function(response) {
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Usuário cadastrado com sucesso')
                            .position('top right')
                            .hideDelay(3000)
                        );
                        $state.go('public.login');
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

            function handleCancel() {
                $state.go('public.login');
            }
            
            function _init () {
                
            }
            
            function _matchPassword (value1, value2) {
                if (value1 === value2) {
                    $scope.registerForm.confirmPassword.$setValidity('passwordMatch', true);
                } else {
                    $scope.registerForm.confirmPassword.$setValidity('passwordMatch', false);
                }
            }
            
            // watchers
            $scope.$watch(function () {
                return vm.username;
            }, function (newValue, oldValue) {
               $scope.registerForm.username.$setValidity('alreadyInUse', true);
            });
            
            $scope.$watch(function () {
                return vm.confirmPassword;
            }, function (newValue, oldValue) {
               _matchPassword(newValue, vm.password);
            });
            
            $scope.$watch(function () {
                return vm.password;
            }, function (newValue, oldValue) {
               _matchPassword(newValue, vm.confirmPassword);
            });
            
            $scope.$watch('registerForm', function () {
                if ($scope.registerForm.username) {
                    $scope.registerForm.username.$setValidity('alreadyInUse', true);
                }
            }); 
            
            _init();
        }

})();