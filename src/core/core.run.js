(function () {
    'use strict';

    angular
        .module('app.core')
        .run(defineSystemRoles)

        defineSystemRoles.$inject = ['PermRoleStore', 'store'];

        function defineSystemRoles (PermRoleStore, store) {

            PermRoleStore.defineRole('ROLE_ADMIN', _checkRoles);
            PermRoleStore.defineRole('ROLE_USER', _checkRoles);

            function _checkRoles (roleName, transitionProperties) {
                let currentUser = store.get('user');
                let isPermited = false;

                if (currentUser) {
                    isPermited = currentUser.roles.indexOf(roleName) > -1;
                }

                return isPermited;
            }
        }
})();
