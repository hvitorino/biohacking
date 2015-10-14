Biohacking.form.fields.Lookup = function() {
  Biohacking.form.fields.Field.apply(this, arguments);
  
  this.options = [];
  
  this.getValue = function() {
    var founded = this.options.filter(function(option) {
      return option.selected;
    })[0];    
    return (founded)? founded.getValue() : null;
  };
  
  this.sorter = function(a, b){
    if (a.el.innerHTML > b.el.innerHTML) {
      return 1;
    }
    if (a.el.innerHTML < b.el.innerHTML) {
      return -1;
    }
    return 0;
  };
  
  this.deselectAll = function(lookupOption) {
    this.options.forEach(function(option) {
      if(option !== lookupOption) option.deselect();
    });
  };
  
  this.createOption = function(config) {
    var option = new Biohacking.form.fields.LookupOption;
    option.register({
      selected: {
        handler: function(lookupOption) {
          this.deselectAll(lookupOption);
          this.fireEvent("changed", lookupOption);
          this.fireEvent("selected");
        },
        scope: this
      }
    });
    return option.render(config); 
  };
  
  this.binding = function(model) {
    var name = this.name;
    var attr = model.attributes[name];

    if(name && attr) {
      this.register({
        changed: {
          handler: function(field, lookupOption) {
            
            var json = {};
            json[name] = lookupOption.getValue();
            model.setValues(json);
            
          },
          scope: this
        }
      });
      
      var json = {};
      json[name] = this.getValue();
      model.setValues(json);
      
    }
    
  };
  
  this.render = function(config){
    this.config = config;
    this.el = document.createElement("div");
    this.el.setAttribute("class", "list-group");    
    this.name = this.config.name;
    
    this.options = Object.keys(this.config.options).map(function(key){
      var conf = { 
        key: key, 
        value: this.config.options[key]
      };
      return this.createOption(conf);
    }, this);
    
    this.options.sort(this.sorter)
                .map(function(option){ return option.el; })
                .forEach(this.el.appendChild, this.el);
          
    return this;
  };
  
};