Ext.define('EVEInDust.store.OrderStatuses', {
    extend: 'Ext.data.Store',
    model: 'EVEInDust.model.OrderStatus',
    pageSize: 0,
    storeId: "OrderStatuses",
    autoLoad: true
});