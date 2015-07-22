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
  
  var tableEl = document.querySelector("[name="+name+"]");
  var tbody = tableEl.querySelector("tbody");
  
  this.reset = function() {
    tbody.innerHTML = "";
  };
  
  var docFragment = document.createDocumentFragment();
  
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