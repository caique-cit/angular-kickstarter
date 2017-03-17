(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

        HomeController.$inject = ['logger','HomeService','$mdDialog', '$rootScope', 'ProjectService', 'CoreUserService', '$scope'];

        function HomeController (logger, HomeService, $mdDialog, $rootScope, ProjectService, CoreUserService, $scope) {
            var vm = this;

            vm.projects = [];
            vm.post = {};
            vm.pager = {};
            vm.isLoading = true;
            vm.pager.itemsPerPage = '12';


            $rootScope.$on('post_update', function(event, data) {
                activate();
            });

            function _getProjects () {
                firebase.database()
                    .ref('/users/' + CoreUserService.getCurrentUser().uid + '/projects')
                    .once('value')
                    .then(function (response) {

                        let receivedVal = response.val();

                        Object.keys(receivedVal).map((key, val) => {
                            let newProject = receivedVal[key];

                            newProject.pid = key;
                            vm.projects.push(newProject);
                            vm.isLoading = false;

                            $scope.$apply();
                        })
                    })
            }

            vm.showDialog = function(post) {

                $mdDialog.show({
                    templateUrl: 'components/home/delete-dialog.html',
                    controller: 'DeleteController',
                    controllerAs: 'delete',
                     locals : {
                        project : project
                    }
                });
            }

            function _init() {
                _getProjects();
            }

            _init();
        }
})();
