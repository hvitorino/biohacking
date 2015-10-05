Ext.define('Biohacking.view.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    items: [{
        region: 'north',
        html: '<h1 class="x-panel-header">Page Title</h1>',
        border: false,
        margin: '0 0 5 0'
    }, {
        region: 'center',
        xtype: 'logsgrid'
    }]
});