Biohacking.KIND = {
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

var i18n = {
  en: {
    "kind": "Kind",
    "logged_at": "Logged At",
    "description": "Description"
  },
  ptBR: {
    "kind": "Tipo",
    "logged_at": "Registrado Em",
    "description": "Descrição"
  }
};

var columns = [
  {
    title: "#",
    mapping: "id"
  },
  {
    title: "kind",
    formatter: function(value){ 
      return Biohacking.KIND[ Number(value) ];
    }
  },
  "description",
  {
    title: "logged_at",
    formatter: function(value){
      return moment( value ).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  {
    title: "",
    formatter: function(){
      return "";
    }
  },
  {
    title: "",
    formatter: function(value, log, column, grid){
      
      var deleteButton = document.createElement("a");
      deleteButton.setAttribute("class", "glyphicon glyphicon-remove text-danger");
      deleteButton.addEventListener("click", function(log){
        
        
      }.bind(grid, log));
      
      column.setAttribute("class", "text-danger");
      column.appendChild( deleteButton );
      return null;
    }
  }
];

//  var area = document.querySelector("[name=logs]");
  var messages = new Messages;

  var grid = new Biohacking.Grid();
  grid.setI18n(i18n.ptBR);
  grid.setMessages(messages);
//  area.appendChild(   grid.render(columns) );
  
  var logsController = new LogsController;
  var formFilter = document.querySelector(".filter");
  
  formBuilder = new Biohacking.TrackFormBuilder;  
  formFilter.appendChild( formBuilder.render(window.layout).el );
  
/*
  formFilter.addEventListener("submit", function(evt){
    evt.preventDefault();
    grid.reset();
    var logFilter = {};
    Array.prototype.forEach.call(formFilter.querySelectorAll(".form-control"), function(item){
      if(item.value && item.value !== "ALL" ) {
        logFilter[item.name] = item.value;
      }
    });
    console.log(logFilter);
    logsController.index(logFilter, function(logs){

      grid.load(logs);
    });
  });
  
  var log = document.querySelector(".log");
  log.addEventListener("click", function(evt){
    evt.preventDefault();
    formBuilder = new Biohacking.FormBuilder;
    formBuilder.save = function(json) {
      var logJSON = { log: json };
       logsController.create(logJSON, function(savedLog){
         console.log( "Update grid with", savedLog );
         dialog.close();
       });
    };
    dialog = new DialogWindow({
      title: "Log",
      content: formBuilder.render(window.layout)
    });
    dialog.show();
  });
*/