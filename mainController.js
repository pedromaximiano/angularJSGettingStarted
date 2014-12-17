// mainController.js

(function () {
  "use strict";

  var MainController = function ($interval, $location) {
    var vm = this;

    vm.username = '';
    vm.countdown = 5;
    vm.countdownActive = null;

    function decrementCountdown() {
      vm.countdown -= 1;
      if (vm.countdown < 1) {
        vm.search();
      }
    }

    vm.search = function () {
      if (vm.countdownActive) {
        $interval.cancel(vm.countdownActive);
        vm.countdownActive = null;
      }
      //
    };

    vm.startCountdown = function () {
      vm.countdownActive = $interval(decrementCountdown, 1000, vm.countdown);
    };

    vm.startCountdown();
  };

  // register the HelloController with angular
  var app = angular.module('HelloApp');

  app.controller('MainCtrl', ['$interval', '$location', MainController]);
}());
