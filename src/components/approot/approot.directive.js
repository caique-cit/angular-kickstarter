(function () {

    'use strict';

    angular.module('app.approot')
        .directive('tmplApproot', directiveFunction);

    directiveFunction.$inject = ['UserService'];

    // ----- directiveFunction -----
    function directiveFunction(UserService) {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html',
            scope: {
            },
            link: function(scope) {
              scope.isLogin = UserService.getCurrentUser() ? true : false;
            }
        };

        return directive;
    }

})();
