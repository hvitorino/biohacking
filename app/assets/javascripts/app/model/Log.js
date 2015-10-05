Ext.define('Biohacking.model.Log', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'description', type: 'string'},
         {name: 'logged_at',  type: 'date'},
         {name: 'kind',       type: 'int'}
     ],
     proxy: {
       type: "rest",
       url: "/logs",
       format: "json",
       extraParams: {
         authenticity_token : Ext.select("meta[name='csrf-token']").first().getAttribute('content')
       }
     }
 });