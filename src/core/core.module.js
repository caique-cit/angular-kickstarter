(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate', 'ngMaterial', 'ngSanitize','angular-cache','pascalprecht.translate',


        // Our reusable framework
        'fw.exception', 'fw.logger',

        // 3rd Party modules
        'ui.router', 'permission', 'permission.ui',


        'dataGrid', 'pagination', 'ui.bootstrap'
    ]);
})();
