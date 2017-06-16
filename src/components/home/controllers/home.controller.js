(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['logger','HomeService', '$mdToast', '$mdDialog', '$rootScope', 'ProjectService', 'CoreUserService', '$scope', '$state'];

        function HomeController (logger, HomeService, $mdToast, $mdDialog, $rootScope, ProjectService, CoreUserService, $scope, $state) {
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

            function _getTimeTracking (startDate, endDate) {
              let date1 = new Date(startDate);
              let date2 = new Date(endDate);

              let timeDiff = Math.abs(date2.getTime() - date1.getTime());
              let diffDays = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 5);

              return diffDays;
            }

            function _checkIfIsLate (date1, date2, interval, projectPhases) {
              let startDate = new Date(date1);
              let endDate = new Date(date2);
              let today = Date.now();
              let targetDate = new Date();
              let lateSeverity = 0;

              targetDate.setDate(startDate.getDate() + interval);

              angular.forEach(projectPhases, function (phase) {
                if (phase.isDone === false || phase.isDone === 'false') {
                  if (targetDate.getTime() > today) {
                    lateSeverity++;
                  }
                }

                targetDate.setDate(targetDate.getDate() + interval);
              });

              return lateSeverity;

            }

            function _getProjects () {
                firebase.database()
                    .ref('/users/' + CoreUserService.getCurrentUser().uid + '/projects')
                    .once('value')
                    .then(function (response) {

                        let receivedVal = response.val();
                        vm.projects = [];

                        Object.keys(receivedVal).map((key, val) => {
                            let newProject = receivedVal[key];

                            let lateSeverity = _checkIfIsLate(newProject.startDate, newProject.endDate, _getTimeTracking(newProject.startDate, newProject.endDate), newProject.phases);

                            newProject.pid = key;

                            if (lateSeverity > 0 && !newProject.isAlreadySeen) {
                              var toast = $mdToast.simple()
                                .textContent('O projeto ' + newProject.name + ' pode estar atrasado')
                                .action('VER')
                                .highlightAction(true);

                              $mdToast.show(toast).then(function(response) {
                                if ( response == 'ok' ) {
                                  newProject.isAlreadySeen = true;
                                  $state.go('private.projectDetails', {
                                    id: newProject.pid
                                  });
                                }
                              });
                            }

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
