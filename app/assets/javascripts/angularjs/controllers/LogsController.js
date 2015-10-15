(function() {
    'use strict';


  function LogController($scope, LogsServices, $interpolate, $location, $route) {
    
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
    
    $scope.create = function(kind) {
      this.logController.logsServices.save({
        kind: kind
      }, function(model) {
         this.logController.$location.path("/logs/" + model.id);
      }.bind(this));
      
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
    
    $scope.logs = LogsServices.query(function(list) {
      
      if($route.current.params.id) {
        this.model = list.filter(function(log){ return log.id == $route.current.params.id })[0];
      }
      
    }.bind(this));
    
    this.$route = $route;
    this.$location = $location;
    this.logsServices = LogsServices;
    
    this.reload = function(){
      this.$location.path("/");
      $route.reload();
    }.bind(this);
    
    this.done = function() {
      this.model.$update(this.reload);
    };
    
    this.destroy = function() {
      this.model.$delete(this.reload);
    };
        
  };
  
  Biohacking.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'LogController',
          controllerAs: 'logController',
          templateUrl: 'loglist.html'
        })
        .when('/logs/:id', {
          controller: 'LogController',
          controllerAs: 'logController',
          templateUrl: 'loglist.html'
        })
        .when('/add', {
          controller: 'LogController',
          controllerAs: 'logController',
          templateUrl: 'add.html'
        });
  }]).controller('LogController', ['$scope', "LogsServices", '$interpolate', '$location', '$route', LogController]);

})();