// userController.js

(function () {
  "use strict";

  var UserController = function (github, $routeParams) {
    var vm = this;

    vm.username = $routeParams.username;

    function onError(response) {
      vm.error = true;
      vm.reason = response.data.message || "Error getting data";
    }

    function onReposSuccess(response) {
      vm.repos = response;
      vm.error = false;
    }

    function onUserSuccess(response) {
      vm.user = response;
      vm.error = false;

      github.getRepos(vm.username).then(onReposSuccess, onError);
    }

    github.getUser(vm.username).then(onUserSuccess, onError);
  };

  // register the HelloController with angular
  var app = angular.module('HelloApp');

  app.controller('UserCtrl', ['github', '$routeParams', UserController]);
}());
