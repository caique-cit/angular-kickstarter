(function () {

    'use strict';

    angular
        .module('app.project')
        .controller('ProjectDetailsController', ProjectDetailsController);

        ProjectDetailsController.$inject = ['$mdDialog', '$mdToast', 'ProjectService', '$state', '$scope', '$stateParams', 'CoreUserService'];

        function ProjectDetailsController($mdDialog, $mdToast, ProjectService, $state, $scope, $stateParams, CoreUserService) {

            let vm = {
                isLoadingFile: null,
                project: {},
                triggerSubmit: triggerSubmit
            };

            function triggerSubmit () {
                let phaseToSave = {};
                let phaseName = '';

                if (vm.define) {
                    phaseToSave = vm.define;
                    phaseName = 'define';
                } else if (vm.measure) {
                    phaseToSave = vm.measure;
                    phaseName = 'measure';
                } else if (vm.analyze) {
                    phaseToSave = vm.analyze;
                    phaseName = 'analyze';
                } else if (vm.improve) {
                    phaseToSave = vm.improve;
                    phaseName = 'improve';
                } else if (vm.control) {
                    phaseToSave = vm.control;
                    phaseName = 'control';
                }

                _saveInfo(phaseToSave, phaseName);

            }

            function _saveInfo (phase, phaseName) {
                let numberOfQuestions = 0;

                switch (phaseName) {
                    case "define" : {
                            numberOfQuestions = 12;
                        }
                        break;
                    case "measure" : {
                            numberOfQuestions = 12;
                        }
                        break;
                    case "analyze" : {
                            numberOfQuestions = 2;
                        }
                        break;
                    case "improve" : {
                            numberOfQuestions = 5;
                        }
                        break;
                    case "control" : {
                            numberOfQuestions = 4;
                        }
                        break;
                }

                _savePhase(phase, phaseName);

                if (Object.keys(phase).length === numberOfQuestions && vm.project.phases[phaseName].isDone === false) {
                    let database = firebase.database().ref();
                    let thisProject = {};

                    vm.project.currentPhase++;
                    vm.project.phases[phaseName].isDone = true;
                    vm.project.phases[phaseName].answers = phase;

                    thisProject['users/' + CoreUserService.getCurrentUser().uid + '/projects/' + $stateParams.id] = vm.project;

                    database.update(thisProject)
                        .then(function  (response) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Parabéns, pode avançar para a proxima fase!')
                                    .hideDelay(3000)
                            );
                        })
                        .catch(function (error) {
                            throw error;
                        });
                }
            }

            function _savePhase (phase, phaseName) {
                let database = firebase.database().ref();
                let newPhase = {};

                newPhase['users/' + CoreUserService.getCurrentUser().uid + '/projects/' + $stateParams.id + '/phases/' + phaseName + '/answers'] = phase;

                database.update(newPhase)
                    .then(function  (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Progresso salvo com sucesso')
                                .hideDelay(3000)
                        );
                    })
                    .catch(function (error) {
                        throw error;
                    });
            }

            function _init() {
                _getThisProject();
            }

            function _getThisProject () {
                firebase.database()
                    .ref('/users/' + CoreUserService.getCurrentUser().uid + '/projects/' + $stateParams.id)
                    .once('value')
                    .then(function (response) {
                        vm.project = response.val();
                        vm.define = vm.project.phases.define.answers;
                        $scope.$apply();
                    })
            }

            $scope.$watch(function () {
                return vm.isLoadingFile
            }, function (newValue, oldValue) {
                if (newValue === true && oldValue === null) {
                    $mdDialog.show({
                        controller: ProjectDetailsController,
                        templateUrl: 'components/project/file-upload-loader.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: false,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    })
                    .then (function () {

                    })

                } else if (newValue === false) {
                    $mdDialog.hide();
                    vm.isLoadingFile = null;
                }
            });

            _init();

            return vm;

        }
})();
