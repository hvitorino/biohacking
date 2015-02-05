var FormEngine = {};

FormEngine.Field = {
  
  text: function(field) {

    var input = document.createElement("input");
    input.setAttribute("id", field.id || field.name);
    input.setAttribute("name", field.name);
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", "Enter text");
    input.setAttribute("mandatory", field.mandatory );
    
    var mandatory = function(event) { 
      /* dever de casa */
      console.log(event.target.value, event.target.checked);
    };
    
    input.addEventListener("keyup", mandatory.bind(input) );
    input.addEventListener("change", mandatory.bind(input) );

    return input;
    
  },
  
  date: function(field) {
    var input = FormEngine.Field.text.call(this, field);
    input.value = moment().format();
    return input;
  },
  
  combo: function(field) {
    var input = document.createElement("select");
    input.setAttribute("id", field.id || field.name);
    input.setAttribute("name", field.name);
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", "Choose");
    input.setAttribute("mandatory", field.mandatory );

    if( field.options ) {
      for(var item in field.options) {
        var option = document.createElement("option");
        option.setAttribute("value", item);
        option.innerHTML = field.options[item];
        input.appendChild(option);
      }
    }
    
    return input;

  },
  
  button: function(field) {
    var input = FormEngine.Field.text.call(this, field);
        input.setAttribute("type", "button");
        input.setAttribute("value", field.name);
        
        /* 
          dever de casa generalizar buttons, aqui convencionei 
          que só teremos submit
        */
        input.addEventListener("click", function(evt){
          evt.preventDefault();          
          evt.target.formParent.submit();
        }.bind(input) );
    
    return input;
  }
  
}

FormEngine.Builder = function(model) {
  
  this.form = document.createElement("form");
  this.fieldList = [];
  this.buttonList = [];
  
  var _model = model;
  this.getModel = function() {
    return _model || {};
  };
  this.setModel = function(model) {
    _model = model;
  };

  this.save = function(json) {
    
    if( this.getModel().id ) {
      console.log("Atualiza", json);
    } else {
      console.log("Cria", json);
    }

  };
  
  this.createLabel = function(field) {
    
    var label = document.createElement("label");
        label.setAttribute("for", field.name);
        label.innerHTML = field.name; //Dever de casa, fazer I18n aqui
        
    return label;
    
  };
  
  this.createInput = function(field) {
    var constructor = FormEngine.Field[field.type] || FormEngine.Field['text'];
    var input = new constructor(field);
    input.formParent = this;
    if( field.type !== 'button') {
      this.fieldList.push( input );
    } else {
      this.buttonList.push( input );
    }
    return input;
  };
  
  this.createField = function(field) {
    
    var formGroup = document.createElement("div");
    formGroup.setAttribute("class", "form-group");
    if( field.type !== 'button') {
      formGroup.appendChild( this.createLabel(field) );
    }
    formGroup.appendChild( this.createInput(field) );
    return formGroup;
    
  };
  
  this.createFields = function(sectionArea, section) {
    if( Array.isArray(section.fields) ) {
      
      section.fields.forEach( function(field){
        sectionArea.appendChild( this.createField( field) );
      }, this );
      
    }
  };
  
  this.createSection = function(section) {
    var sectionArea = document.createElement('div');
    sectionArea.className = 'section';
    
    var description = document.createElement("h3");
    description.innerHTML = section.description;
    
    sectionArea.appendChild( description );
     
    this.createFields(sectionArea, section);
    this.form.appendChild( sectionArea );
  };
  
  this.submit = function() {
    var json = this.fieldList.reduce( function(object, item){
      if(item.name && item.value) object[item.name] = item.value;
      return object;
    }, {});
    this.save(json);
  };
  
  this.render = function(layout) {

    if( layout && layout.sections) {
      layout.sections.forEach(this.createSection, this);
    }
    return this;
  
  };
  
  this.getForm = function() {
    return this.form;
  };
  
  return this;
  
};