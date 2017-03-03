(function () {

    'use strict';

    angular
        .module('app.post')
        .directive('tplPost', tplPost)

        tplPost.$inject = [];

        function tplPost() {

            var directive = {
                restrict: 'E',
                templateUrl: 'components/post/directives/post.html',
                controller: 'PostController',
                controllerAs: 'vm',
                bindToController: true,
            };

            return directive;
        }
})();
