(function () {

    'use strict';
    angular.module('app.post')
    .controller('PostListController', ControllerFunction);

    ControllerFunction.$inject = ['PostListService', '$scope'];

    function ControllerFunction(PostListService, $scope) {
      let vm = this;
      vm.isLoading = false;
      vm.gridOptions = {

           data: [],
           sort: {
               predicate: 'title',
               direction: 'asc'
           }
      }

      $scope.paginationOptions = {};

      vm.getPosts = function(currentPage, itemsPerPage) {
        vm.isLoading = true;
        PostListService.getPosts(currentPage, itemsPerPage ).then(function(response) {
            if (response && response.data) {
              console.log(response);
                vm.gridOptions.data = response.data.posts;
                vm.totalItems = response.data.meta.pagination.total;
                vm.paginationCurrentPage = response.data.meta.pagination.current_page;
                $scope.paginationOptions.itemsPerPage = response.data.meta.pagination.per_page;
                vm.isLoading = false;

            }
        })
      }

      function init() {
        vm.getPosts(1, 10);
      };

      init();

      return vm;
    }

})();
