Biohacking.form.fields.Text = function() {
  Biohacking.form.fields.Field.apply(this, arguments);
  
  this.el = document.createElement("input");
  
  var mandatory = function(event) { 
    /* dever de casa */
    console.log(event.target.value, event.target.checked);
  };
  
  this.el.addEventListener("keyup", mandatory.bind(this.el) );
  this.el.addEventListener("change", mandatory.bind(this.el) );
  
  this.getValue = function() {
    return this.el.value;
  };
  
  this.render = function(field) {
    this.config = field;
    
    if(field.hidden) {
      this.toggle();
    }
    
    var name = field.id || field.name;
    this.name = name;
    
    if(name) { 
      this.el.setAttribute("id", name);
      this.el.setAttribute("name", name);
    }
    this.el.setAttribute("class", "form-control field");
    this.el.setAttribute("placeholder", field.placeholder || "Enter text");
    this.el.setAttribute("mandatory", !!field.mandatory );
    return this;
  };
  
};
