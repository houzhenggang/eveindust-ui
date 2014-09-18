Ext.define('EVEInDust.view.orderCreator.OrderCreatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.OrderCreator',
    requires: [
        "EVEInDust.store.TradeHubs"
    ],
    data: {
        name: 'EVEInDust'
    },
    stores: {
        hubs: {
            source: "TradeHubs"
        }
    }

});
