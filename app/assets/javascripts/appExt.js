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