(function () {
    'use strict';

    angular
        .module('app.toolbar')
        .directive('tmplToolbar', directiveFunction)
        .controller('ToolbarController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        let directive = {
            restrict: 'E',
            templateUrl: 'components/toolbar/toolbar.html',
            scope: {
            },
            controller: 'ToolbarController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdDialog', 'UserService', '$state'];

    /* @ngInject */
    function ControllerFunction($mdDialog, UserService, $state) {
        let vm  = {
          openDialog: openDialog,
          logout: logout,
          hideDialog: hideDialog
        }


        function openDialog() {
          $mdDialog.show({
              templateUrl: 'components/toolbar/confirmation.html',
              controller: 'ToolbarController',
              controllerAs: 'vm'
          });
        }

        function logout() {
          UserService.logout();
          $mdDialog.hide();
          $state.go('public.login');
        }

        function hideDialog() {
          $mdDialog.hide();
        }

        return vm;
    }

})();
