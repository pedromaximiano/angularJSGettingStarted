(function () {
  "use strict";

  // register angular module
  var app = angular.module('HelloApp', ['ngRoute']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'main.html',
        controller: 'MainCtrl',
        controllerAs: 'hello'
      })
      .when('/user/:username', {
        templateUrl: 'user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/user/:username/:repo', {
        templateUrl: 'repo.html',
        controller: 'RepoCtrl',
        controllerAs: 'repo'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
}());
