// hello-controller.js

(function () {
  "use strict";

  var HelloController = function ($interval, $log, $anchorScroll, $location, github) {
    var vm = this;

    vm.error = false;
    vm.message = "GitHub Projects";
    vm.username = '';
    vm.countdown = 5;
    vm.countdownActive = null;

    function onError(response) {
      vm.error = true;
      vm.reason = response.data.message || "Error getting data";
      $log.error("Error: " + (response.data.message || "Error getting data"));
    }

    function onReposSuccess(response) {
      vm.repos = response;
      vm.error = false;
    }

    function onUserSuccess(response) {
      vm.user = response;
      vm.error = false;

      github.getRepos(vm.username).then(onReposSuccess, onError);
      $location.hash("userDetails");
      $anchorScroll();
    }

    function decrementCountdown() {
      vm.countdown -= 1;
      if (vm.countdown < 1) {
        vm.search();
      }
    }

    vm.search = function () {
      $log.info("Searching for " + vm.username);
      github.getUser(vm.username).then(onUserSuccess, onError);
      if (vm.countdownActive) {
        $interval.cancel(vm.countdownActive);
        vm.countdownActive = null;
      }
    };

    vm.startCountdown = function () {
      vm.countdownActive = $interval(decrementCountdown, 1000, vm.countdown);
    };

    vm.startCountdown();
  };

  // register the HelloController with angular
  var app = angular.module('HelloApp');

  app.controller('HelloCtrl', ['$interval', '$log', '$anchorScroll', '$location', 'github', HelloController]);
}());
