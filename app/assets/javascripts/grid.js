var KIND = {
  1: "WEIGHT",
  2: "EAT",
  3: "DRINK",
  4: "WORKOUT",
  5: "HUNGRY",
  6: "SLEEP",
  7: "WAKEUP",
  8: "URINATE",
  9: "DEFECATE",
  10: "SEX",
  11: "BATH"
};


var Grid = function(name) {
  
  var tableEl = document.querySelector("[name="+name+"]");
  var tbody = tableEl.querySelector("tbody");
  
  this.insertItems = function(item) {
    
    var row = document.createElement("tr");
    
    var columnId = document.createElement("td");
    columnId.innerHTML = item.id;
    
    var columnKind = document.createElement("td");
    columnKind.innerHTML = item.kind + " - " + KIND[ Number(item.kind) ];
    
    var columnDescription = document.createElement("td");
    columnDescription.innerHTML = item.description;
    
    var columnLoggedAt = document.createElement("td");
    columnLoggedAt.innerHTML = new Date(item.logged_at);

    row.appendChild( columnId );    
    row.appendChild( columnKind );
    row.appendChild( columnDescription );
    row.appendChild( columnLoggedAt );
    
    tbody.appendChild(row);
    
  };
  
  this.load = function(list) {
    tbody.innerHTML = "";
    list.forEach(this.insertItems);
  }
};