(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('ENDPOINT_URI', 'http://sf3.local/')
        .constant('api', 'http://localhost:7273/api');
})();
