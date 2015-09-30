Biohacking.form.fields.Field = function() {
  
  this._listeners = {};
  this.el;
  this.config = {};
  this._parent;
  
  this.binding = function(model) {
    var json = {};
    json[this.name] = this.getValue();
    model.setValues(json);
  };
  
  this.getValue = function() {
    return this.el.innerHTML;
  };
  
  this.setParent = function(component) {
    this._parent = component;
  };
  
  this.getParent = function() {
    return this._parent;
  };
  
  this.register = function( events ) {
    Object.keys(events).forEach(function(event) {
      this._listeners[event] = events[event];
    }, this);
  };
  
  this.fireEvent = function(event, options) {
    var listener = this._listeners[event];
    if( listener ) {
      listener.handler.call( listener.scope || this, this, options );
    }
  };
  
  this.render = function(config){

    this.config = config;
    this.el = document.createElement("div");
    
    this.name = config.name;
    
    if(this.name) {
      this.el.setAttribute("name", this.name);
    }
    
    if(config["class"]) {
      this.el.setAttribute("class", config["class"]);
    }
        
    return this;
  };
  
  this.toggle = function() {
    this.el.style.display = (this.el.style.display === "none")? "flex":"none";
  };
  
};