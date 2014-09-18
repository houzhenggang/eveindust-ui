Ext.define('EVEInDust.view.orderCreator.OrderCreatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.OrderCreator',
    requires: [
        "EVEInDust.store.Orders"
    ],
    data: {
        name: 'EVEInDust'
    },
    stores: {
        orders: {
            model: 'EVEInDust.model.Order',
            remoteSort: true,
            remoteFilter: true
        }
    }

});
