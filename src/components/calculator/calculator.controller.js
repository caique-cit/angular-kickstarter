(function () {

  'use strict';

  angular
    .module('app.calculator')
    .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = [];

    function CalculatorController () {
      var vm = this;

      vm.data = {};
      vm.calculate = calculate;
      vm.dpmo = '';
      vm.defPercent = 0;
      vm.yeld = 0;
      vm.processSigma = 0;

      return vm;

      function calculate () {
        vm.dpmo = (1000000 * vm.data.defNumber) / (vm.data.opportunities * vm.data.unities);
        vm.defPercent = (vm.data.defNumber / vm.data.unities) * 100;
        vm.yeld = 100 - vm.defPercent;

        if (vm.yeld >= 30.9) {
          vm.processSigma = 1;
        }

        if (vm.yeld > 69.2) {
          vm.processSigma = 2;
        }

        if (vm.yeld > 93.3) {
          vm.processSigma = 3;
        }

        if (vm.yeld > 99.4) {
          vm.processSigma = 4;
        }

        if (vm.yeld > 99.98) {
          vm.processSigma = 5;
        }

        if (vm.yeld > 99.9997) {
          vm.processSigma = 6;
        }
      }
    }
})();
