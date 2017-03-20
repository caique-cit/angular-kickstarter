(function () {

    'use strict';

    angular
        .module('app.project')
        .controller('ProjectDetailsController', ProjectDetailsController);

        ProjectDetailsController.$inject = ['$mdToast', 'ProjectService', '$state', '$scope', '$stateParams', 'CoreUserService'];

        function ProjectDetailsController($mdToast, ProjectService, $state, $scope, $stateParams, CoreUserService) {

            let vm = {
                project: {},
                saveFile: saveFile,
                saveInfo: saveInfo
            };

            function saveFile (model) {
                console.log(model);
            }

            function saveInfo (phase) {
                let empties = 0;
                let phaseName = '';
                let numberOfQuestions = 0;

                switch (vm.project.currentPhase) {
                    case "1" : {
                            phaseName = 'define';
                            numberOfQuestions = 15;
                        }
                        break;
                    case "2" : {
                            phaseName = 'measure';
                            numberOfQuestions = 12;
                        }
                        break;
                    case "3" : {
                            phaseName = 'analyze';
                            numberOfQuestions = 2;
                        }
                        break;
                    case "4" : {
                            phaseName = 'improve';
                            numberOfQuestions = 5;
                        }
                        break;
                    case "5" : {
                            phaseName = 'control';
                            numberOfQuestions = 4;
                        }
                        break;
                }

                _savePhase(phase, phaseName);

                if (Object.keys(phase).length === numberOfQuestions) {
                    vm.project.currentPhase++;
                    vm.project.phases[phaseName].isDone = true;
                }
            }

            function _savePhase (phase, phaseName) {
                let database = firebase.database().ref();
                let newPhase = {};

                console.log(phaseName);

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
                        $scope.$apply();
                    })
            }

            _init();

            return vm;

        }
})();
