
window.layout = {
   sections:[{
     description: '',
     fields: [{
       name: 'kind',
       mandatory: true,
       type: 'combo',
       options: KIND
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

  var grid = new Grid("logs");  
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
      
      var logJSON = {
        log: json
      };
      
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
