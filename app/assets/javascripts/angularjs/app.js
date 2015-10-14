// angular.module(function($http) {
//   $http.defaults.headers.common['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").content;
// });

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
    // $routeProvider
    //   .when('/logs/:id', {
    //     controller: 'LogController',
    //     resolve: {
    //       'Strategy': 'edit'
    //     }
    //   })
    //   .when('/', {
    //     controller: 'LogController'
    //   });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);