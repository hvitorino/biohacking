Ext.define("Biohacking.view.Form", {
  alias: "widget.logsform",
  extend: "Ext.form.Panel",
  constructor: function(){
    this.items = [{
      name: "description",
      xtype: "textfield"
    }];
    this.callParent(arguments);
  }
});