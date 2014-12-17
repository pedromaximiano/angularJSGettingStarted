(function () {
  "use strict";

  // register angular module
  var app = angular.module('HelloApp', ['ngRoute']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl',
        controllerAs: 'hello'
      })
      .when("/user/:username", {
        templateUrl: 'user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
}());
