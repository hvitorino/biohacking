Biohacking.form.fields.Date = function() {
  Biohacking.form.fields.Text.apply(this, arguments);
  
  this._oldRender = this.render;
  
  this.binding = function(model) {
    var name = this.name;
    var attr = model.attributes[name];

    if(name && attr) {
      this._oldEl.addEventListener("change", function() {
        var json = {};
        json[name] = this.getValue();
        model.setValues(json);
      }.bind(this) );
      
      var json = {};
      json[name] = this.getValue();
      model.setValues(json);
    }
    
  };
  
  this.getValue = function() {
    return this._oldEl.value;
  };
  
  this.render = function(field) {
    this._oldRender(field);
    
    this._oldEl = this.el;
    this._oldEl.value = moment().format("DD/MM/YYYY HH:mm:ss");
        
    this.el = document.createElement("div");
    this.el.setAttribute("class", "input-group date");
    
    var glyphicon = document.createElement("span");
    glyphicon.setAttribute("class", "glyphicon glyphicon-calendar");
    var addon = document.createElement("span");
    addon.setAttribute("class", "input-group-addon");
    addon.appendChild( glyphicon );
    
    this.el.appendChild( this._oldEl );
    this.el.appendChild( addon );

    return this;
  };
};