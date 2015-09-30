//http://fullcalendar.io/

Biohacking.form.Builder = function(){

  this.layout;
  this.sections = [];
  this._model;
  this.el = document.createElement("form");
  this.afterRender = function(){ console.log("Original"); };

  this.createSection = function(section){
      var sectionComponent = new Biohacking.form.Section;
      sectionComponent.render(section);
      return sectionComponent;
  };
  
  this.binding = function(field) {
    field.binding( this._model );
  };
  
  this.setModel = function(model) {
    this._model = model;
    
    this.sections.forEach(function(section){
      section.fields.forEach(this.binding, this);
    }, this);
    
  };
  
  this.findField = function(fieldName) {
    
    return this.sections.reduce(function(founded, section){
      section.fields.forEach(function(field){
        if(fieldName === field.name) founded = field;
      });
      return founded;
    }, null);
    
  };
  
  this.getValues = function() {
    
    return this.sections.reduce(function(values, section){
      section.fields.forEach(function(field){
        var value = field.getValue();
        if(value && field.name && field.config.type !== "Button") {
          values[field.name] = value;
        }
      });
      return values;
    }, {});
    
  };

  this.render = function(layout){
    if(layout) this.layout = layout;
    this.sections = this.layout.sections.map( this.createSection, this );
    var sections = document.createDocumentFragment();
    this.sections.map(function(section){ return section.el; })
                 .forEach( sections.appendChild, sections );
    this.el.appendChild( sections );
    this.afterRender();
    return this;
  };
  
};