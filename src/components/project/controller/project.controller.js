(function () {

    'use strict';

    angular
        .module('app.project')
        .controller('ProjectController', ControllerFunction);

        ControllerFunction.$inject = ['$mdToast', 'ProjectService', '$state', '$location', '$scope', '$stateParams', 'CoreUserService'];

        function ControllerFunction($mdToast, ProjectService, $state, $location, $scope, $stateParams, CoreUserService) {

            let projects = {};
            let vm = {
                project: {},
                isNew: true,
                addProject: addProject,
                removeProject: removeProject
            };

            function _init() {
                _setProjectModel();
              if ($stateParams.id) {
                vm.isNew = false;
                _populateViewModel();
              }
            }

            function _populateViewModel() {
                let database = firebase.database().ref();

                database
                    .child('users')
                    .child(CoreUserService.getCurrentUser().uid)
                    .child('projects')
                    .child($stateParams.id)
                    .once('value')
                    .then(function (response) {
                        vm.project = response.val();
                        vm.project.endDate = new Date(vm.project.endDate);
                        vm.project.startDate = new Date(vm.project.startDate);
                        $scope.$apply();
                    });

            }

            function _setProjectModel () {
                vm.project = {
                    uid: CoreUserService.getCurrentUser().uid,
                    name: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    notes: "",
                    currentPhase: 1,
                    isDone: false,
                    phases: {
                        define: {
                            isDone: false,
                            answers: ""
                        },
                        measure: {
                            isDone: false,
                            answers: ""
                        },
                        analyze: {
                            isDone: false,
                            answers: ""
                        },
                        improve: {
                            isDone: false,
                            answers: ""
                        },
                        control: {
                            isDone: false,
                            answers: ""
                        }
                    }
                }
            }

            function addProject (newProject) {
                let database = firebase.database().ref();
                
                let feedbackMessage = 'Projeto editado com sucesso';
                let newProjectKey = $stateParams.id;
                
                if (vm.isNew) {
                  feedbackMessage = 'Novo projeto adicionado com sucesso';
                  
                  newProjectKey = database
                    .child('users')
                    .child(CoreUserService.getCurrentUser().uid)
                    .child('projects')
                    .push().key;
                }
                
                newProject.endDate = new Date(newProject.endDate);
                newProject.startDate = new Date(newProject.startDate);

                projects['users/' + CoreUserService.getCurrentUser().uid + '/projects/' + newProjectKey] = newProject;

                database.update(projects)
                    .then(function  (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(feedbackMessage)
                                .hideDelay(3000)
                        );
                        $state.go('private.home');
                    })
                    .catch(function (error) {
                        throw error;
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

            _init();

            return vm;
        };
})();
