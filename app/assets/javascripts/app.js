/* Hack, Log, Analize, Hack */

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

Biohacking.App = function(){

  this.newLog = function(){
      this._formBuilder.show();
  };

  this.created = function(form, log){
     this._formBuilder.hide();
  };

  this._formFilter = document.querySelector(".filter");

  this._formBuilder = new Biohacking.form.LogCreate;
  this._formBuilder.render();
  this._formBuilder.register({
    created: {
      handler: this.created, scope: this
    }
  });
  
  this._formFilter.appendChild( this._formBuilder.el );

}

app = new Biohacking.App();