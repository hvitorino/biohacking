(function() {
    'use strict';

  function LogController($scope, $http) {
    
    $scope.logs = [];
    $http.get('/logs.json').success(function(response) {
        $scope.logs = response.data
        console.log($scope.logs);
    });
    
    $scope.getKind = function(kind) {
      return Biohacking.KIND[kind];
    };
    
  };

  angular
      .module('Biohacking')
      .controller('LogController', LogController);

})();