(function () {

    'use strict';

    angular.module('app.approot')
        .directive('tmplApproot', directiveFunction);

    directiveFunction.$inject = ['CoreUserService'];

    // ----- directiveFunction -----
    function directiveFunction(CoreUserService) {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html',
            scope: {
            },
            link: function(scope) {
              scope.isLogin = CoreUserService.getCurrentUser() ? true : false;
            }
        };

        return directive;
    }

})();
