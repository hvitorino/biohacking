Biohacking = angular.module('Biohacking', ['ngRoute', 'ngResource', 'ngSanitize']);

Biohacking.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers['X-CSRF-Token'] =  document.querySelector("meta[name='csrf-token']").content;
      return config;
    }
  };
});

Biohacking.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});

Biohacking.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);