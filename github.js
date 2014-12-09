// github.js

(function () {
  "use strict";

  var github = function ($http) {

    var getUser = function (username) {
      return $http.get('https://api.github.com/users/' + username)
        .then(function (response) {
          return response.data;
        });
    };

    var getRepos = function (username) {
      return $http.get('https://api.github.com/users/' + username + '/repos')
        .then(function (response) {
          return response.data;
        });
    };

    return {
      getUser: getUser,
      getRepos: getRepos
    };
  };

  var module = angular.module('HelloApp');

  module.factory('github', github);
}());
