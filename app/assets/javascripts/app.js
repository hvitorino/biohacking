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
    "loggedAt": "Logged At",
    "description": "Description"
  },
  ptBR: {
    "kind": "Tipo",
    "loggedAt": "Registrado Em",
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
    title: "loggedAt",
    formatter: function(value){ 
      return moment( value ).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  "",
  ""
];

window.layout = {
   sections:[{
     description: '',
     fields: [{
       name: 'kind',
       mandatory: true,
       type: 'combo',
       options: Biohacking.KIND
     },{
       name: 'description',
       mandatory: true,
       type: 'text'
     },{
       name: 'logged_at',
       mandatory: true,
       type: 'date'
     }]
   },{
     description: '',
     fields: [{
        name: 'submit',
        type: 'button'
     }]
   }]
};

  var area = document.querySelector("[name=logs]");
  var messages = new Messages;

  var grid = new Biohacking.Grid();
  grid.setI18n(i18n.ptBR);
  grid.setMessages(messages);
  area.appendChild(   grid.render(columns) );
  
  var logsController = new LogsController;
  var formFilter = document.querySelector(".filter > .collapse-filter > form");
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
    
    var formBuilder = new FormEngine.Builder;
    formBuilder.save = function(json) {

      var logJSON = { log: json };
      
       logsController.create(logJSON, function(savedLog){
         console.log( "Update grid with", savedLog );
         dialog.close();
       });
       
    };
    var form = formBuilder.render(window.layout);
    
    dialog = new DialogWindow({
      title: "Log",
      content: form.getForm()
    });
    dialog.show();
    
  });
