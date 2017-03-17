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
                addProject: addProject
            };

            function _init() {
                _setProjectModel();
              if ($stateParams.id) {
                _populateViewModel();
              }
            }

            function _populateViewModel() {
                  ProjectService.getUpdateProject().then(function(dataProject) {
                      vm.post = dataProject.data.data;
                      vm.post.title = vm.post.title;
                      vm.post.slug = vm.post.slug;
                      vm.post.content = vm.post.content;
                  });
            }

            function _setProjectModel () {
                vm.project = {
                    uid: CoreUserService.getCurrentUser().uid,
                    name: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    notes: "",
                    currentPhase: "1",
                    isDone: "false",
                    phases: {
                        define: {
                            isDone: "false",
                            answers: ""
                        },
                        measure: {
                            isDone: "false",
                            answers: ""
                        },
                        analyze: {
                            isDone: "false",
                            answers: ""
                        },
                        improve: {
                            isDone: "false",
                            answers: ""
                        },
                        control: {
                            isDone: "false",
                            answers: ""
                        }
                    }
                }
            }

            function addProject (newProject) {
                let database = firebase.database().ref();

                let newProjectKey = database
                    .child('users')
                    .child(CoreUserService.getCurrentUser().uid)
                    .child('projects')
                    .push().key;

                projects['users/' + CoreUserService.getCurrentUser().uid + '/projects/' + newProjectKey] = newProject;

                database.update(projects)
                    .then(function  (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Novo projeto adicionado com sucesso')
                                .hideDelay(3000)
                        );
                        $state.go('private.home');
                    })
                    .catch(function (error) {
                        throw error;
                    });
            }

            _init();

            return vm;
        };
})();
