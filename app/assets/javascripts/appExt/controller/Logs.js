Ext.define('Biohacking.controller.Logs', {
  extend: 'Ext.app.Controller',
   
  adicionar: function(){
    var win = Ext.create("Ext.window.Window", {
       title: "Adicionar",
       modal: true,
       items: [ { xtype: "logsform" } ]
    });
    win.show();
  },
  
  editar: function(grid, cellEl, columnIndex, record, rowEl, rowIndex, e) {
    var form = Ext.createByAlias("widget.logsform");
    form.loadRecord(record);
    var win = Ext.create("Ext.window.Window", {
       title: "Adicionar",
       modal: true,
       items: [ form ]
    });
    win.show();
  },

  init: function() {
   this.control({
     'logsgrid': {
       afterrender: {
         fn: function(grid){
           grid.getStore().load();
         },
         scope: this
       },
       adicionar: {
         fn: this.adicionar,
         scope: this
       },
       cellclick: {
         fn: this.editar,
         scope: this
       }
     }
   });

  }

});