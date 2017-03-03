(function () {

    'use strict';

    angular.module('app.home')
      .service('HomeService', ServiceFunction);

      ServiceFunction.$inject = ['$http', 'ENDPOINT_URI'];


      function ServiceFunction($http, ENDPOINT_URI) {
        var service = this,
            path = 'api/v1/en/post',
            datas = [];

            function getUrl() {
                return ENDPOINT_URI + path;
            }

            service.getPosts = function() {
                return $http.get(getUrl());
            }

            service.delete = function(id) {
              return $http.delete(ENDPOINT_URI + 'api/v1/en/post/' + id);
            }
      }
})();
