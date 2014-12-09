(function () {
  "use strict";

  // register angular module
  var app = angular.module('HelloApp', ['ngRoute']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'HelloCtrl',
        controllerAs: 'hello'
      })
      .otherwise({
        redirectTo: '/main.html'
      });
  });
}());
