Ext.define('EVEInDust.Application', {
    extend: 'Ext.app.Application',
    
    name: 'EVEInDust',
    requires: [
        'Ext.grid.Panel'
    ],

    stores: [
        'TradeHubs',
        "OrderStatuses"
    ]
});
