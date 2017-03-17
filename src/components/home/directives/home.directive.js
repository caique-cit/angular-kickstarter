(function () {

    'use strict';

    angular
        .module('app.home')
        .directive('tmplHome', tmplHome)

        // ----- directiveFunction -----
        tmplHome.$inject = [];

        /* @ngInject */
        function tmplHome () {

            var directive = {
                restrict: 'E',
                templateUrl: 'components/home/directives/home.directive.html',
                controller: 'HomeController',
                controllerAs: 'home'
            };

            return directive;
        }
})();
