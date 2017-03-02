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
    ControllerFunction.$inject = ['$mdDialog', 'CoreUserService', '$state', '$translate', '$scope'];

    /* @ngInject */
    function ControllerFunction($mdDialog, CoreUserService, $state, $translate, scope) {
        let vm  = {
          openDialog: openDialog,
          logout: logout,
          hideDialog: hideDialog,
          languages: {'PT':'pt','EN':'en'}

        };

        scope.$watch('vm.language', function() {
            $translate.use(vm.language);
        });

        vm.language = $translate.proposedLanguage() || $translate.use();

        function openDialog() {
          $mdDialog.show({
              templateUrl: 'components/toolbar/confirmation.html',
              controller: 'ToolbarController',
              controllerAs: 'vm'
          });
        }

        function logout() {
          CoreUserService.logout();
          $mdDialog.hide();
          $state.go('public.login');
        }

        function hideDialog() {
          $mdDialog.hide();
        }

        return vm;
    }

})();
