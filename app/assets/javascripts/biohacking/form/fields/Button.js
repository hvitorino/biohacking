Biohacking.form.fields.Button = function() {
  
  Biohacking.form.fields.Text.apply(this, arguments);
  
  this._oldRender = this.render;
  
  this.render = function(field) {
    this._oldRender(field);
    this.el.setAttribute("type", "button");
    this.el.setAttribute("class", "form-control btn btn-primary");
    this.el.setAttribute("value", field.title || field.name);
    
    if( field.handler ) {
      this.el.addEventListener("click", field.handler);
    }
    
    return this;
  };
  
};
