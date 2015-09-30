Biohacking.form.fields.LookupOption = function() {
  
  Biohacking.form.fields.Field.apply(this, arguments);
      
  this.el = document.createElement("div");
  this.selected = false;
  
  this.getValue = function() {
    return this.el.getAttribute("name");
  };
  
  this.deselect = function() {
    this.el.setAttribute("class", "list-group-item");
  };
  
  this.select = function() {
    this.selected = true;
    this.el.setAttribute("class", "list-group-item active");
  }
    
  this.render = function(config) {
    this.config = config;
    this.el.setAttribute("name", config.key);
    this.el.setAttribute("class", "list-group-item");
    this.el.innerHTML = config.value;

    this.el.addEventListener("click", function(evt){
      evt.preventDefault();          
      this.select();
      this.fireEvent("selected");
    }.bind(this) );
    
    return this;
    
  };
  
};