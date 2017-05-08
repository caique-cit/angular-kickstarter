(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('DeleteController', DeleteController);

        DeleteController.$inject = ['$scope', 'project', 'callback', 'HomeService', '$mdDialog'];

        function DeleteController($scope, project, callback, HomeService, $mdDialog) {
            
            var vm = this;
            $scope.project = project;

            vm.remove = function() {

                callback(project.pid);  
                $scope.$emit('project_update', 1);
                $mdDialog.hide();
            }

            vm.hideDialog = function() {
                $mdDialog.hide();
            }
        }

})();
