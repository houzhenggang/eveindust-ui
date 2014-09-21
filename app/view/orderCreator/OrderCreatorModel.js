Ext.define('EVEInDust.view.orderCreator.OrderCreatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.OrderCreator',
    requires: [
        "EVEInDust.store.TradeHubs",
        "EVEInDust.model.sde.IndustryActivityProduct",
        "EVEInDust.model.sde.InvType"
    ],
    data: {
        name: 'EVEInDust'
    },
    stores: {
        hubs: {
            source: "TradeHubs"
        },
        industry_activity_products: {
            model: "EVEInDust.model.sde.IndustryActivityProduct",
            pageSize: 0,
            remoteFilter: true
        },
        itemId2Name: {
            model: "EVEInDust.model.sde.InvType",
            pageSize: 0,
            remoteFilter: true
        }
    }

});
