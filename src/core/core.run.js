(function () {
    'use strict';

    angular
        .module('app.core')
        .run(defineSystemPermissions)

        defineSystemPermissions.$inject = ['PermPermissionStore'];

        function defineSystemPermissions (PermPermissionStore) {
            let permissions = [];

            PermPermissionStore
                .defineManyPermissions(permissions, function () {
                    return true;
                })
        }
})();
