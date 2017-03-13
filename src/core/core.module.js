(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate', 'ngMaterial', 'ngMessages', 'ngSanitize','angular-cache','pascalprecht.translate',
        'firebase',


        // Our reusable framework
        'fw.exception', 'fw.logger',

        // 3rd Party modules
        'ui.router', 'permission', 'permission.ui',


        'dataGrid', 'pagination'
    ]);
})();
