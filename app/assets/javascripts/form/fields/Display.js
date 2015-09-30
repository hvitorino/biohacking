Biohacking.form.fields.Display = function() {
  Biohacking.form.fields.Field.apply(this, arguments);
  
  this._oldRender = this.render;
  
  this.messageArea = document.createElement("div");
  this.hideButton = document.createElement("div");
  this.hideButton.setAttribute("class", "glyphicon glyphicon-remove display-hide-button");
  
  this.setText = function(message) {
    this.messageArea.innerHTML = message;
  };
  
  this.render = function(field) {
    this._oldRender(field);
    
    this.el.appendChild( this.hideButton );    
    this.el.appendChild( this.messageArea );

    this.setText(field.message);
    
    return this;
  };
  
};
