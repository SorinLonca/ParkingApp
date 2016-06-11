angular.module('starter.login.services', [])

.factory('LoginService', LoginService);

  LoginService.$inject = ['$http'];

  function LoginService($http) {
    var factory = {};

    factory.create = function(url, data) {
      var action = $http.post(url, data);
      return action;
    };

    factory.update = function(url, data) {
      var action = $http.put(url, data);
      return action;
    };

    factory.get = function(url) {
      var action = $http.get(url);
      return action;
    }

    return factory;
  }
