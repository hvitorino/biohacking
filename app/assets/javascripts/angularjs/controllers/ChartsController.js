function ChartsController($scope, ChartsServices) {
  
  ChartsServices.query(function(chart) {    
    this.data = chart.data;
    this.labels = chart.labels;
    this.series = chart.series;
  }.bind($scope));
  
  $scope.labels = [];
  $scope.series = [];
  $scope.data = [];
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
      
};

Biohacking
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/charts', {
      controller: 'ChartsController',
      controllerAs: 'chartsController',
      templateUrl: 'charts.html'
    });
}])
.config(['ChartJsProvider', function (ChartJsProvider) {
  ChartJsProvider.setOptions({
    responsive: true
  });
  ChartJsProvider.setOptions('Line', {
    datasetFill: true
  });
}])
.controller('ChartsController', ['$scope', 'ChartsServices', ChartsController]);