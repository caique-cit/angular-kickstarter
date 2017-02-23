(function () {
    'use strict';

    angular
        .module('app.core')
        .run(defineSystemPermissions, defineSystemRoles)

        defineSystemPermissions.$inject = ['PermPermissionStore'];

        function defineSystemPermissions (PermPermissionStore) {
            let permissions = ['viewDashboard'];

            PermPermissionStore
                .defineManyPermissions(permissions, function () {
                    return true;
                })
        }

        defineSystemRoles.$inject = ['PermRoleStore'];

        function defineSystemRoles (PermRoleStore) {

            PermRoleStore.defineRole('ROLE_ADMIN', ['viewDashboard']);
            PermRoleStore.defineRole('ROLE_USER', ['viewDashboard']);
        }
})();
