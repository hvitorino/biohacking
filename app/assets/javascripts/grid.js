var KIND = {
  11: "BATH",
  9: "DEFECATE",
  3: "DRINK",
  2: "EAT",
  5: "HUNGRY",
  10: "SEX",
  6: "SLEEP",
  8: "URINATE",  
  7: "WAKEUP",    
  1: "WEIGHT",
  4: "WORKOUT"
};


var Grid = function(name) {
  
  this.messages;
  
  this.setMessages = function(messages) {
    this.messages = messages;
  };
  
  var tableEl = document.querySelector("[name="+name+"]");
  var tbody = tableEl.querySelector("tbody");
  
  this.reset = function() {
    tbody.innerHTML = "";
  };
  
  var docFragment = document.createDocumentFragment();
  
  this.insertRevived = function(row) {
    
    if( row.children[3].textContent === "Invalid date" ) {
      tbody.appendChild(row);
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
    columnKind.innerHTML = item.kind + " - " + KIND[ Number(item.kind) ];
    
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
  
  this.load = function(list) {
    tbody.innerHTML = "";
    list.forEach(this.insertItems);
    tbody.appendChild(docFragment);
  }
};