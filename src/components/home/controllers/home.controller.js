(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['logger','HomeService', '$mdToast', '$mdDialog', '$rootScope', 'ProjectService', 'CoreUserService', '$scope'];

        function HomeController (logger, HomeService, $mdToast, $mdDialog, $rootScope, ProjectService, CoreUserService, $scope) {
            var vm = this;

            vm.projects = [];
            vm.post = {};
            vm.pager = {};
            vm.isLoading = true;
            vm.pager.itemsPerPage = '12';
            vm.removeProject = removeProject;

            $rootScope.$on('project_update', function(event, data) {
              _init();
            });

            function _getProjects () {
                firebase.database()
                    .ref('/users/' + CoreUserService.getCurrentUser().uid + '/projects')
                    .once('value')
                    .then(function (response) {

                        let receivedVal = response.val();
                        vm.projects = [];

                        Object.keys(receivedVal).map((key, val) => {
                            let newProject = receivedVal[key];

                            newProject.pid = key;
                            vm.projects.push(newProject);
                            vm.isLoading = false;

                            $scope.$apply();
                        })
                    })
            }

            vm.showDialog = function(project, callback) {

                $mdDialog.show({
                    templateUrl: 'components/home/delete-dialog.html',
                    controller: 'DeleteController',
                    controllerAs: 'delete',
                    locals : {
                        project : project,
                        callback: callback
                    }
                });
            }
            
            function removeProject (projectId) {
              let database = firebase.database().ref();
              
              database
                .child('users')
                    .child(CoreUserService.getCurrentUser().uid)
                    .child('projects')
                    .child(projectId)
                    .remove();
                    
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Projeto removido com sucesso')
                            .hideDelay(3000)
                    );
            }

            function _init() {
                _getProjects();
            }

            _init();
        }
})();
