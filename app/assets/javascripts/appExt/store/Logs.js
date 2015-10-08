Ext.define('Biohacking.store.Logs', {
  extend: "Ext.data.Store",
  model: 'Biohacking.model.Log',
  proxy: {
     type: 'ajax',
     url: '/logs.json'
  },
  autoLoad: false
 });