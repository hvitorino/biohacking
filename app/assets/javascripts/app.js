Biohacking.KIND = {
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

var i18n = {
  en: {
    "kind": "Kind",
    "logged_at": "Logged At",
    "description": "Description"
  },
  ptBR: {
    "kind": "Tipo",
    "logged_at": "Registrado Em",
    "description": "Descrição"
  }
};
  

var formFilter = document.querySelector(".filter");

Biohacking.Attribute = {};
Biohacking.Attribute.Date = function(value){
  return moment(value, "DD/MM/YYYY HH:mm:ss").format();
};


Biohacking.Model = function(attributes) {
  this.attributes = attributes || {};
  
  this.get = function(attribute) {
    var attr = this.attributes[attribute];
    return ( attr )? attr.value : "";
  };

  this.setValues = function(json, formatted){
    for(var key in json) {
       var attribute = this.attributes[key];
       if(attribute) {

         var value = json[key];
         
         if( !formatted ) {
           var handler = Biohacking.Attribute[attribute.type];
           if(handler) value = handler(value);           
         }
         
         this.attributes[key].value = value;
       }
    }
  };

  this.getValues = function() {
    return Object.keys(this.attributes)
                 .reduce(function(json, key){
      var value = this.attributes[key].value;
      if( value ) json[key] = value;
      return json;
    }.bind(this), {});
  }
  
  this.reset = function() {
    for(var key in this.attributes) {
      this.attributes[key].value = "";
    }
  }

};

Biohacking.LogModel = function() {
  Biohacking.Model.call(this);
  this.attributes = {
     id: {},
     kind: {},
     logged_at: { type: "Date" },
     description: {}
  };
}

// var attributes = {
//    logged_at: { type: "Date" },
//    description: { type: "string" }
// };
// var log = new Biohacking.Model(attributes);
// log.setValues({ 
//     display: "mensagem qualquer",
//     description: "#vine",
//     logged_at: "29/09/2015"
// });
// log.getValues();



Biohacking.TrackFormBuilder = function() {
  
  this.resetModel = function() {
    this._model.reset();
  };
  
  this.loadModel = function(json) {
    this._model.setValues(json, true);
  };

  var logsController = new LogsController;
  
  this.toggleSections = function() {
    this.sections.forEach(function(section){
      section.toggle();
    });
  };
  
  this.displayMessage = function(message) {
    var field = this.findField("display");
    field.setText(message);
  };
  
  this.destroy = function() {

    logsController.destroy({id: this._model.get("id") }, function(){

      this.resetModel();
      this.toggleSections();
      this.findField("kind").deselectAll();
      this.displayMessage("Registro excluído com sucesso");
      this.findField("display").getParent().toggle();
      
    }.bind(this) );
  };
  
  this.done = function() {
    
    logsController.update(this._model.getValues(), function(){
      
      this.resetModel();
      this.toggleSections();
      this.findField("kind").deselectAll();
      
    }.bind(this) );
  };
  
  this.create = function() {

      logsController.create( this._model.getValues(), function(xhr) {
        
        this.loadModel( JSON.parse(xhr.responseText) );
        this.toggleSections();

        this.displayMessage( Biohacking.KIND[this._model.attributes.kind.value] );
        
      }.bind(this));
      
  };
  
  this.layout = {

     sections:[
     {
       hidden: true,
       fields: [{
         name: 'display',
         "class": "display",
         message: 'Atividade inserida com sucesso!',
         type: 'Display'
       }]
     },
      {
        fields: [{
          name: 'kind',
          mandatory: true,
          type: 'Lookup',
          options: Biohacking.KIND
        }]
      },
      {
        hidden: true,
        fields: [{
          name: 'logged_at',
          mandatory: true,
          type: 'Date'
        }]
     },{
       hidden: true,
       fields: [{
          name: 'description',
          placeholder: "Enter tags to edit",
          type: 'Text'
       }]
     },{
        hidden: true,
        fields: [{
            name: 'Delete',
            type: 'Button',
            handler: this.destroy.bind(this)
         },{
           name: 'Done',
           type: 'Button',
           handler: this.done.bind(this)
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
Biohacking.TrackFormBuilder.prototype = new Biohacking.form.Builder;

//formBuilder = new Biohacking.TrackFormBuilder;
//formFilter.appendChild( formBuilder.render(window.layout).el );