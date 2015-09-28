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

Biohacking.TrackFormBuilder = function() {

  var logsController = new LogsController;
  
  this.destroy = function() {
    logsController.destroy({id: this._model.id}, function(){
      
      this.setModel( null );
      
      var field = this.findField("display");
      field.el.innerHTML = "Registro excluído com sucesso";
      
      this.sections.forEach(function(section){
        section.toggle();
      }, this);
      
    }.bind(this) );
  };
  
  this.done = function() {
    
    var description = this.findField("description");
    this._model.description = description.getValue();
    
    logsController.update(this._model, function(){
      
      this.setModel( null );
      this.sections.forEach(function(section){
        section.toggle();
      }, this);
      
    }.bind(this) );
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
        handler:function(){
          logsController.create(this.getValues(), function(xhr) {
            
            this.setModel( JSON.parse(xhr.responseText) );
            
            var field = this.findField("display");
            field.el.innerHTML = field.el.innerHTML + "<div>" + Biohacking.KIND[this._model.kind] + "</div>";
            
            this.sections.forEach(function(section){
              section.toggle();
            }, this);
            
          }.bind(this));
        },
        scope: this
      }
    });
    
  };
  
};
Biohacking.TrackFormBuilder.prototype = new Biohacking.FormBuilder;

formBuilder = new Biohacking.TrackFormBuilder;
formFilter.appendChild( formBuilder.render(window.layout).el );