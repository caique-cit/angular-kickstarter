(function () {

    'use strict';

    angular.module('app.home')
      .service('PostListService', ServiceFunction);

      ServiceFunction.$inject = ['$http', 'ENDPOINT_URI'];


      function ServiceFunction($http, ENDPOINT_URI) {
        var service = this,
            path = 'api/v1/en/post',
            datas = [];

            function getUrl() {
                return ENDPOINT_URI + path;
            }

            service.getPosts = function(page, countPage) {
                return $http.get(getUrl() + '?page=' + page + '&perPage=' + countPage);
            }


      }
})();
