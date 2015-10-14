(function() {
    'use strict';
    
    function LogModel() {

      return function(data) {
        
        angular.extend(this, {
            id:null,
            status:'NEW',
            isNew:function(){
                return (this.status=='NEW' || this.id == null);
            }
        });
        angular.extend(this, data);
        
      };

    };

    Biohacking.factory('LogModel', LogModel);

})();