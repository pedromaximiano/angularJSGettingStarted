// repoController.js

(function () {
  "use strict";

  var RepoController = function (github, $routeParams) {
    var vm = this;

    vm.username = $routeParams.username;
    vm.repo = $routeParams.repo;

    function onError(response) {
      vm.error = true;
      vm.reason = response.data.message || "Error getting data";
    }

    function onContributorsSuccess(response) {
      vm.contributors = response;
      vm.error = false;
    }

    function onRepoSuccess(response) {
      vm.repos = response;
      vm.error = false;
      github.getContributors(vm.username, vm.repo).then(onContributorsSuccess, onError);
    }

    github.getRepo(vm.username, vm.repo).then(onRepoSuccess, onError);
  };

  // register the HelloController with angular
  var app = angular.module('HelloApp');

  app.controller('RepoCtrl', ['github', '$routeParams', RepoController]);
}());
