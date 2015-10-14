(function() {
    'use strict';

  function LogController($scope, logs) {

    $scope.logs = logs.query();
    
    // $http.get('/logs.json').success(function(response) {
    //     $scope.logs = response.data
    //     console.log($scope.logs, response.data);
    // });
    
    $scope.getKind = function(kind) {
      //return Biohacking.KIND[kind];
      return teste;
    };
    
  };

  Biohacking.controller('LogController', ['$scope', "logsServices", LogController]);

})();