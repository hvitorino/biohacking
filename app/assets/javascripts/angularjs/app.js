// angular.module(function($http) {
//   $http.defaults.headers.common['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").content;
// });

angular.module('Biohacking', []);

angular.module('Biohacking').factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers['X-CSRF-Token'] =  document.querySelector("meta[name='csrf-token']").content;
      return config;
    }
  };
});

angular.module('Biohacking').config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});