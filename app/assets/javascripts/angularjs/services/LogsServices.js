;(function() {
    'use strict';
    
    function LogsServices($resource) {
      return $resource('/logs/:id.json', { id:'@id' }, {
        'query' : { method:'GET', isArray:true },
        'update': { method:'PUT' }
      });
    };

    Biohacking.factory('LogsServices', ['$resource', LogsServices]);

})();