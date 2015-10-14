Biohacking.form.Section = function() {
  this.fields = [];
  this.el = document.createElement("div");
  this.el.setAttribute("class", "section");
  
  this.createField = function(field) {
      var item = Biohacking.form.fields[field.type] || Biohacking.form.fields.Field;
      var fieldComponent = (new item).render(field)
      fieldComponent.setParent(this);
      return fieldComponent;
  };
  
  this.hide = function() {
    this.el.style.display = "none";
  };
  
  this.toggle = function() {
    this.el.style.display = (this.el.style.display === "none")? "flex":"none";
  };
  
  this.render = function(section) {
    
    if(section.hidden) this.hide();
    
    this.fields = section.fields.map(this.createField, this);
    this.fields.forEach(function(field){
      this.el.appendChild( field.el );
    }, this);
    return this;
  };
  
};