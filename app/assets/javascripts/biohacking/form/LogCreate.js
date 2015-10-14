Biohacking.form.LogCreate = function() {

  var logsController = new LogsController;

  this.create = function() {

      logsController.create( this._model.getValues(), function(xhr) {
         var json = JSON.parse(xhr.responseText);
         this.fireEvent("created", json );
      }.bind(this));
      
  };

  this.layout = {

     sections:[
      {
        fields: [{
          name: 'kind',
          mandatory: true,
          type: 'Lookup',
          options: Biohacking.KIND
        }]
      }]
  };


  this.afterRender = function() {
    
    this.findField("kind").register({
      selected: {
        handler: this.create,
        scope: this
      }
    });
    
    var model = new Biohacking.LogModel;
    model.reset();
    this.setModel(model);
    
  };

};

Biohacking.form.LogCreate.prototype = new Biohacking.form.Builder;