Ext.define('EVEInDust.view.salesItemsHistory.SalesItemsHistoryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SalesItemsHistory',
    data: {
        name: 'EVEInDust'
    },
    stores: {
        items: {
            model: "EVEInDust.model.Item",
            pageSize: 0,
            filters: [{
                id: "lastTransactionDatetime",
                property: "lastTransactionDatetime",
                value: 'null',
                operator: "!="
            }],
            remoteFilter: true
        }
    }
});
