(function () {

    'use strict';

    angular
        .module('app.project')
        .directive('ssFmea', [function () {
          return {
            restrict: 'E',
            templateUrl: 'components/project/directives/fmea.directive.html',
            link: function (scope, elem, attrs) {
              if(!scope.fmea) {
                scope.fmea = [];
              }

              scope.removeItem = function(index) {
                scope.fmea.splice(index, 1);
              };

              //add fma function
              elem.find('#add-fmea').on('click', function () {
                scope.item = {};
                scope.item.etapa = scope.etapa;
                scope.item.falha = scope.falha;
                scope.item.efeito = scope.efeito;
                scope.item.sev = scope.sev;
                scope.item.causas = scope.causas;
                scope.item.occ = scope.occ;
                scope.item.controles = scope.controles;
                scope.item.det = scope.det;
                scope.item.rpn = scope.sev * scope.occ * scope.det;

                scope.etapa = '';
                scope.falha = '';
                scope.efeito = '';
                scope.sev = '';
                scope.causas = '';
                scope.occ = '';
                scope.controles = '';
                scope.det = '';

                scope.fmea.push(scope.item);

                if(scope && !scope.$$phase) {
                  scope.$apply();
                }
              });
            }
          }
      }]);
})();
