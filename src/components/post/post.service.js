(function () {

    'use strict';
     angular.module('app.post')
     .service('PostService', ServiceFunction);

     ServiceFunction.$inject = ['$http', 'ENDPOINT_URI', '$stateParams'];

     function ServiceFunction($http, ENDPOINT_URI, stateParams) {
        var service = this,
            path = 'api/v1/en/post';


            function getUrl() {
                return ENDPOINT_URI + path;
            }

            service.getPosts = function() {
                return $http.get(getUrl());
            }

            service.addPosts = function(post) {
                return $http.post(getUrl(), post);
            }

            service.getUpdatePost = function(post) {
                return $http.get(ENDPOINT_URI + 'api/v1/en/post/' + stateParams.id);
            }

            service.updatePost = function(post) {
                return $http.put(ENDPOINT_URI + 'api/v1/en/post/' + stateParams.id, post);
            }
            service.update = function(item) {
                console.log(item);
            }
     };

})();
