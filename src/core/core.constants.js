/* global _ */

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('api', 'http://localhost:7203/api')
        .constant('ENDPOINT_URI', 'http://sf3.local/');
})();
