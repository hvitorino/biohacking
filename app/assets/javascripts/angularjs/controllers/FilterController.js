function FilterController($scope, LogsServices, $interpolate, $location, $route) {
  
  $scope.$interpolate = $interpolate;
  $scope.$location = $location;

  $scope.KIND = {
    11: "BATH",
    9: "DEFECATE",
    3: "DRINK",
    2: "EAT",
    5: "HUNGRY",
    12: "PARTY",
    10: "SEX",
    6: "SLEEP",
    8: "URINATE",  
    7: "WAKEUP",    
    1: "WEIGHT",
    4: "WORKOUT"
  };
      
};

Biohacking.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/filter', {
        controller: 'FilterController',
        controllerAs: 'filterController',
        templateUrl: 'filter.html'
      });
}]).controller('LogController', ['$scope', "LogsServices", '$interpolate', '$location', '$route', LogController]);
