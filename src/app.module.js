(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.home',
        'app.login',
        'app.post',
        'app.quickstart',
        'app.register',
        'app.toolbar'
    ]);
})();
