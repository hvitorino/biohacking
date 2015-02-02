var DialogWindow = function(config) {
  
  this.dom = document.createElement("div");
  this.dom.setAttribute("class", "modalDialog");
  this.dom.setAttribute("id", "openModal");
  
  var close = document.createElement("a");
  close.setAttribute("class", "close");
  close.setAttribute("title", "Close");
  close.setAttribute("href", "#close");
  close.innerHTML = "X";
    
  var title = document.createElement("h2");
  title.innerHTML = config.title;
  
  var content = document.createElement("div");
  
  if(config.content) {
    if(typeof config.content === "string") {
      content.innerHTML = config.content;
    } else {
      content.innerHTML = "";
      content.appendChild(config.content);
    }   
  }
  
  var bodyWindow = document.createElement("div");
  bodyWindow.appendChild(close);
  bodyWindow.appendChild(title);
  bodyWindow.appendChild(content);
  this.dom.appendChild(bodyWindow);
  
  document.body.appendChild( this.dom );
  
  this.close = function() {
    document.body.removeChild( this.dom );
  };
  
  this.show = function() {
    this.dom.setAttribute("class", "modalDialog open");
  }
  
  var scope = this;
  close.addEventListener("click", function(evt) {
    evt.preventDefault();
    scope.close();
  });
    
}

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