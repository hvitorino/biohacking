function LogoutController($scope, $location, $route) {
  
  this.$route = $route;
  this.$location = $location;
  
  this.reload = function() {
      debugger;
  };
  

  
};

Biohacking.config(['$routeProvider',
  function($routeProvider) {
    // $routeProvider
    //   .when('/users/sign_out', {
    //     controller: 'LogoutController',
    //     controllerAs: 'logoutController'
    //   });
}]).controller('LogoutController', ['$scope','$location', '$route', LogoutController]);