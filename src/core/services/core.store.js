(function () {

    'use strict';
     angular.module('app.core')
     .factory('CoreStore', CoreStore);

     CoreStore.$inject = ['config', 'CacheFactory'];

     function CoreStore(config, CacheFactory) {

        var self = {
            getCacheFactory: getCacheFactory,
            destroy: destroy,
            set: set,
            get: get
        };

        function getCacheFactory() {

            let cacheConfig = config.appCacheConfig;

            if (! CacheFactory.get(cacheConfig) ) {

				CacheFactory.createCache(cacheConfig);
			}

			return CacheFactory.get(cacheConfig);
        }

		/**
		 * @ngdoc method
		 * @name set
		 * @description Method that sets the value of a key in the Store
		 * @param {key} Key to be set
		 * @returns {value} object
		 * @example set('user')
		 */
		function set(key, value) {

			self.getCacheFactory().put(key , value);

			return  self.get(key);
		}


		/**
		 * @ngdoc method
		 * @name set
		 * @description Method that gets the value of a key in the Store
		 * @param {key}  Key to be sought
		 * @returns {Object} object
		 * @example get('user')
		 */
		function get(key) {

            var value = self.getCacheFactory().get(key);

			return value;
		}

        /**
		 * @ngdoc method
		 * @name destroy
		 * @description Completely deletes cache
		 */
		function destroy() {

			self.getCacheFactory().destroy();
			self.getCacheFactory().removeExpired();
		}

        return self;
     }

})();
