(function () {

    'use strict';

    angular
        .module('fw.FirebaseFileReader')
        .directive('firebaseFileReader', firebaseFileReader)

        firebaseFileReader.$inject = ['CoreUserService'];

        function firebaseFileReader (CoreUserService) {

            let directive = {
                restrict: 'A',
                scope: {
                    firebaseFileReader: '=',
                    model: '=',
                    isLoadingFile: '='
                },
                link: directiveAction
            }

            return directive;

            function directiveAction (scope, element, attrs) {
                element.bind('change', function (event) {
                    let file = (event.srcElement || event.target).files[0];
                    let fileExt = file.name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0];

                    if (scope.firebaseFileReader.indexOf(fileExt) > -1) {
                        let storageRef = firebase.storage().ref();
                        let currentUserRef = storageRef.child(CoreUserService.getCurrentUser().uid + '/files');
                        let uploadTask = currentUserRef.child(file.name).put(file);

                        uploadTask.on('state_changed', function (snapshot) {
                          // Observe state change events such as progress, pause, and resume
                          // See below for more detail

                          if (snapshot && snapshot.f === 'running') {
                              scope.isLoadingFile = true;
                          }
                        }, function(error) {
                            throw error;
                        }, function() {
                          // Handle successful uploads on complete
                          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                          scope.model = uploadTask.snapshot.downloadURL;
                          scope.isLoadingFile = false;
                        });
                    }
                });
            }
        }
})();
