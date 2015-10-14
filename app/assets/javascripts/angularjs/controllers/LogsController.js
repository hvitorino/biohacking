(function() {
    'use strict';

  function LogController($scope, logs, $interpolate, $location) {

    $scope.logs = logs.query();
    
    $scope.$interpolate = $interpolate;
    $scope.$location = $location;

    $scope.KIND = {
      11: "BATH",
      9: "DEFECATE",
      3: "DRINK",
      2: "EAT",
      5: "HUNGRY",
      10: "SEX",
      6: "SLEEP",
      8: "URINATE",  
      7: "WAKEUP",    
      1: "WEIGHT",
      4: "WORKOUT"
    };
    
    $scope.edit = function() {
      debugger;

    };
    
    $scope.getKind = function(kind) {
      return this.KIND[kind];
    };
    
    $scope.formatTags = function() {
      
      return (this.log.description) ?
        
        this.log.description.split(" ").map(function(tag){  
          return this.$interpolate('<a>{{tag}}</a>')( { tag: tag });
        }, this).join(" ") : "";
      
    };
        
  };

  Biohacking.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/logs/:id', {
          controller: 'EditLogController',
          controllerAs: 'editLog',
          template: "log-edit"
        });

  }]).controller('LogController', ['$scope', "LogsServices", '$interpolate', '$location', LogController]);
  
  function EditLogController($scope, logs, $routeParams, $location) {    
    $scope.log = $routeParams;
    debugger;
  };
  
  Biohacking.controller('EditLogController', ['$scope', "LogsServices", '$routeParams', '$location', EditLogController]);

})();