var Messages = function() {
  
  this.el = document.querySelector(".messages");
  this.el.style.display = "none";
  this.el.setAttribute("class", "messages alert alert-warning alert-dismissible");
  this.el.setAttribute("role", "alert");
  
  this.renderLink = function(callback) {
    var linkText = document.createTextNode("Desfazer?");
    var link = document.createElement("a");
    link.appendChild(linkText);
    link.setAttribute("class", "glyphicon glyphicon-arrow-left undo");
    link.addEventListener("click", callback);
    this.el.appendChild(link);
  };

  this.display = function(callback) {    
    this.el.style.display = "block";
    this.el.innerHTML = "1 Log excluído";
    this.renderLink(callback);   
  };
  
  this.hide = function() {
    this.el.style.display = "none";
  };
  
};