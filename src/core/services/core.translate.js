(function () {
    'use strict';

    var core = angular.module('app.core');
    core.factory('CoreTranslateCache', CoreTranslateCache);

    // Configure the app
    core.config(configTranslateFunction);

    configTranslateFunction.$inject = [
        'CacheFactoryProvider',
        '$translateProvider'
    ];

    /* @ngInject */
    function configTranslateFunction(
        CacheFactoryProvider,
        $translateProvider){

        $translateProvider.useSanitizeValueStrategy(null);

        $translateProvider
            .useStaticFilesLoader({
                files: [{
                   prefix: 'i18n/locale-',
                   suffix: '.json'
               }
                ]

            })
            .fallbackLanguage('pt')
            .preferredLanguage('pt');

        $translateProvider.useStorage('CoreTranslateCache');

    }

    CoreTranslateCache.$inject = ['config', 'CoreStore'];

    function CoreTranslateCache(config, store) {

       return {
           put: function (name, value) {
               store.set(name, value);
           },
           get: function (name) {
               return store.get(name);
           }
        };
    }

})();
