(function () {

    'use strict';

    angular
        .module('app.project')
        .directive('tplProject', tplProject)

        tplProject.$inject = [];

        function tplProject() {

            var directive = {
                restrict: 'E',
                templateUrl: 'components/project/directives/project.html',
                controller: 'ProjectController',
                controllerAs: 'vm',
                bindToController: true,
            };

            return directive;
        }
})();
