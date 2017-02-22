(function () {

    'use strict';

    angular.module('app.quickstart')
        .directive('tmplQuickstart', directiveFunction)
        .controller('QuickstartController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/quickstart/quickstart.html',
            scope: {
            },
            controller: 'QuickstartController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger', '$scope'];

    /* @ngInject */
    function ControllerFunction(logger, $scope) {

        $scope.costCenter = [
                {name: 'Joana', cddi:'122', country: 'brazil', mrc: '4999', functionalArea: 'Ti', region: 'Local', smartScopeFlag: true, supplyChainFlag: true, responsible:  'Jose do santos' },
                {name: 'Paloma', cddi:'123', country: 'brazil', mrc: '350', functionalArea: 'Ti', region: 'Local', smartScopeFlag: true, supplyChainFlag: true, responsible:  'Jose do santos' },
                {name: 'Rafael', cddi:'124', country: 'brazil', mrc: '245', functionalArea: 'Ti', region: 'Local', smartScopeFlag: true, supplyChainFlag: true, responsible:  'Jose do santos' },
                {name: 'Diego', cddi:'125', country: 'brazil', mrc: '158', functionalArea: 'Ti', region: 'Local', smartScopeFlag: true, supplyChainFlag: true, responsible:  'Jose do santos' },
                {name: 'Jose', cddi:'126', country: 'brazil', mrc: '900', functionalArea: 'Ti', region: 'Local', smartScopeFlag: true, supplyChainFlag: true, responsible:  'Jose do santos' },
                {name: 'Roander', cddi:'127', country: 'brazil', mrc: '5000', functionalArea: 'Ti', region: 'Local', smartScopeFlag: true, supplyChainFlag: true, responsible:  'Jose do santos' }
            ];


        activate();

        function activate() {
            logger.log('Activated Quick Start View');
        }
    }

})();
