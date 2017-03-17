(function () {

    'use strict';
     angular.module('app.project')
     .service('ProjectService', ServiceFunction);

     ServiceFunction.$inject = ['$http', 'ENDPOINT_URI', '$stateParams'];

     function ServiceFunction($http, ENDPOINT_URI, $stateParams) {
        var service = this,
            path = 'api/v1/en/post';


            function getUrl() {
                return ENDPOINT_URI + path;
            }

            service.getProjects = function(pageNumber, itemsPerPage) {
                return $http.get(getUrl() + '?page=' + pageNumber + '&perPage=' + itemsPerPage);
            }

            service.addProjects = function(post) {
                return $http.post(getUrl(), post);
            }

            service.getUpdateProject = function(post) {
                return $http.get(ENDPOINT_URI + 'api/v1/en/post/' + $stateParams.id);
            }

            service.updateProject = function(post) {
                return $http.put(ENDPOINT_URI + 'api/v1/en/post/' + $stateParams.id, post);
            }
     };

})();
