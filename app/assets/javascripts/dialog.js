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
    
};