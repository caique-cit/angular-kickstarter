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
        // $translateProvider.useLoader('$translatePartialLoader', {
        //   urlTemplate: 'src/components/{part}/i18n/{lang}.json'
        // })
        //      .fallbackLanguage('en')
        //      .preferredLanguage('en')
        //      .forceAsyncReload(true);

        $translateProvider
            .useStaticFilesLoader({
                files: [{
                   prefix: 'src/core/i18n/locale-',
                   suffix: '.json'
               }, {
                   prefix: 'src/components/login/i18n/locale-',
                   suffix: '.json'
               }
                ]

            })
            .fallbackLanguage('en')
            .preferredLanguage('en');

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
