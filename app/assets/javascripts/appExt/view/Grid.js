Ext.define("Biohacking.view.Grid", {
  extend: 'Ext.grid.Panel',
  alias: "widget.logsgrid",
  title: 'Logs',
  store: Ext.create("Biohacking.store.Logs"),
  buttons: [{
    text: "Add"
  }],
  columns: [
    { 
      text: "Description", 
      dataIndex: "description"
    },{ 
      text: "Logged At", 
      dataIndex: "logged_at"
    }
  ],
  constructor: function() {
    this.buttons = [{
      text: "Add",
      handler: function(){
         this.fireEvent("adicionar");
      },
      scope: this
    }];
    this.callParent(arguments);
  }
 });