Ext.define('EVEInDust.view.orderCreator.OrderCreatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.OrderCreator',
    requires: [
    ],
    data: {
        name: 'EVEInDust'
    },
    stores: {
        orders: {
            model: 'EVEInDust.model.Order',
            remoteSort: true,
            remoteFilter: true,
            autoLoad: true
        }
    }

});
