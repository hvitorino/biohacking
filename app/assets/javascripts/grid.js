Biohacking.Grid = function() {
  
  this.columns = [];

  this.thead = document.createElement("thead");
  this.tbody = document.createElement("tbody");

  this.table = document.createElement("table");
  this.table.setAttribute("class", "table table-condensed");  
  this.table.appendChild(this.thead);
  this.table.appendChild(this.tbody);
  
  this.messages;
  this.i18n = {};
  
  this.setI18n = function(i18n) {
    this.i18n = i18n;
  };
  
  this.setMessages = function(messages) {
    this.messages = messages;
  };
    
  this.reset = function() {
    this.tbody.innerHTML = "";
  };
  
  this.insertRevived = function(row) {
    
    if( row.children[3].textContent === "Invalid date" ) {
      this.tbody.appendChild(row);
    } else {
      var columns = Array.prototype.map.call(tbody.querySelectorAll("tr"), function(tr){ return tr.children[3].textContent; });
      //achar o index
      //inserir
    }
    
  };
  
  this.insertItems = function(item) {
    
    var row = document.createElement("tr");
    
    var columnId = document.createElement("td");
    columnId.setAttribute("data-id", item.id);
    columnId.innerHTML = item.id;
    
    var columnKind = document.createElement("td");
    columnKind.innerHTML = item.kind + " - " + Biohacking.KIND[ Number(item.kind) ];
    
    var columnDescription = document.createElement("td");
    columnDescription.innerHTML = item.description;
    
    var columnLoggedAt = document.createElement("td");
    columnLoggedAt.innerHTML = moment( item.logged_at ).format('MMMM Do YYYY, h:mm:ss a');
    
    var deleteButton = document.createElement("a");
    deleteButton.setAttribute("class", "glyphicon glyphicon-remove text-danger");
    deleteButton.addEventListener("click", function(){
      var controller = new LogsController
      controller.destroy({id:item.id}, function(log){
        this.messages.display(function() {
          console.log("desfez!");
          debugger;
          this.insertRevived(row);
          this.messages.hide();
        }.bind(this));
        tbody.removeChild( row );
      }.bind(this));
    }.bind(this));

    var exclude = document.createElement("td");
    exclude.setAttribute("class", "text-danger");
    exclude.appendChild( deleteButton );

    row.appendChild( columnId );    
    row.appendChild( columnKind );
    row.appendChild( columnDescription );
    row.appendChild( columnLoggedAt );
    row.appendChild( exclude );
    row.appendChild(  document.createElement("td") );
    
    docFragment.appendChild(row);
    //tbody.appendChild(row);
    
  };
  
  this.formatTitle = function(title) {
    var translated = this.i18n[title];
    if(translated) title = translated;
    return title;
  }
  
  this.createRow = function(log){
    var row = document.createElement("tr");
    this.columns.forEach(function(column){
      var columnHtml = document.createElement("td");

      var value = "";      
      var mappedBy = column;
      
      if( typeof mappedBy !== "string") {
        mappedBy = ( column.mapping )? column.mapping : column.title;          
      }
      
      if( column.formatter ) {
        value = column.formatter( log[mappedBy], log, columnHtml );
      } else {
        value = new String( log[mappedBy] ).toString();
      }
      
      if(typeof value === "string") {
        columnHtml.innerHTML = value;
      }
      row.appendChild(columnHtml);
    }, this);
    return row;
  };
  
  this.load = function(data) {
    var docFragment = document.createDocumentFragment();
    data.forEach(function(row){
      docFragment.appendChild( this.createRow(row) );
    }, this);
    this.tbody.appendChild(docFragment);
  };
  
  this.render = function(columns){
    this.columns = columns;
    var row = document.createElement("tr");
    this.columns.forEach(function(item){
      var column = document.createElement("th");
      column.innerHTML = this.formatTitle(  (typeof item === "string")? item:item.title );
      row.appendChild(column);
    }, this);
    this.thead.appendChild(row);
    return this.table;
  }
  
};