(function () {
  "use strict";

  // register angular module
  var app = angular.module('HelloApp', []);

  // the HelloController
  var HelloController = function ($http, $interval, $log, $anchorScroll, $location) {
    var vm = this;

    vm.error = false;
    vm.message = "GitHub Projects";
    vm.username = '';
    vm.countdown = 5;
    vm.countdownActive = null;

    function onError(data) {
      vm.error = true;
      vm.reason = data || "Error getting data";
      $log.error("Error: " + (data.message || "Error getting data"));
    }

    function onReposSuccess(data) {
      vm.repos = data;
      vm.error = false;
    }

    function onUserSuccess(data) {
      vm.error = false;
      vm.user = data;

      $http.get('https://api.github.com/users/' + vm.username + '/repos')
        .success(onReposSuccess)
        .error(onError);
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
      $http.get('https://api.github.com/users/' + vm.username)
        .success(onUserSuccess)
        .error(onError);
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
  app.controller('HelloCtrl', ['$http', '$interval', '$log', '$anchorScroll', '$location', HelloController]);
}());
