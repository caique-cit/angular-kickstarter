(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.calculator',
        'app.help',
        'app.home',
        'app.login',
        'app.project',
        'app.quickstart',
        'app.register',
        'app.toolbar'
    ]);
})();
