Ext.define('EVEInDust.store.Orders', {
    extend: 'Ext.data.Store',
    model: 'EVEInDust.model.Order',
    storeId: "Orders",
    remoteSort: true,
    remoteFilter: true,
    autoLoad: true
});