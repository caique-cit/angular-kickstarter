(function () {
    'use strict';

    angular
        .module('app.core')
        .run(defineSystemInicialization);

        defineSystemInicialization.$inject = ['PermRoleStore', 'CoreStore','$rootScope','$translate'];

        function defineSystemInicialization (PermRoleStore, store, $rootScope, $translate) {


            $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
               $translate.refresh();
            });
            PermRoleStore.defineRole('ROLE_ADMIN', _checkRoles);
            PermRoleStore.defineRole('ROLE_USER', _checkRoles);

            function _checkRoles (roleName) {
                let currentUser = store.get('user');
                let isPermited = false;

                if (currentUser) {
                    isPermited = currentUser.roles.indexOf(roleName) > -1;
                }

                return isPermited;
            }
        }
})();
