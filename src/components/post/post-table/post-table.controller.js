(function () {

    'use strict';
    angular.module('app.post')
    .controller('PostListController', ControllerFunction);


    ControllerFunction.$inject = ['HomeService'];

    function ControllerFunction(HomeService) {
      let vm = this;
      vm.gridOptions = {

           data: [], //required parameter - array with data
           //optional parameter - start sort options

           urlSync: true,

           sort: {
               predicate: 'title',
               direction: 'asc'
           }

      };

      function init() {
        HomeService.getPosts().then(function(response) {
            if (response && response.data) {
                vm.gridOptions.data = response.data.posts;
                //let data = response.data.some
                let totalItems = response.data.meta.count;
            }
        });
      };


      init();
    }

})();
