//
//= require ext-all
//= require_tree ./app/model
//= require_tree ./app/store
//= require_tree ./app/view
//= require_tree ./app/controller
//= require ./app/view/Grid
//= require_self


Ext.Ajax.timeout = 300000;
Ext.Ajax.extraParams = {
  authenticity_token : Ext.select("meta[name='csrf-token']").first().getAttribute('content')
}

Ext.application({
    name: 'Biohacking',
    appFolder: '/assets/app',
    autoCreateViewport: 'Biohacking.view.Main',
    controllers: ['Logs']
});