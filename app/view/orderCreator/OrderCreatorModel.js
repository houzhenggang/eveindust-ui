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
        typeId2Name: {
            model: "EVEInDust.model.sde.InvType",
            pageSize: 0,
            remoteFilter: true
        },
        itemToProduceCounts: {
            pageSize: 0,
            remoteFilter: true,
            fields: [
                { name: "id", type: "int"},
                { name: "count", type: "int"}
            ],
            proxy: {
                "type": "rest",
                "url": "/api/yapeal/sumofproducingitemsperitemtoproduces",
                "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
                "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
                "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
            }
        }
    }

});
