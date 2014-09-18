Ext.define('EVEInDust.view.orderCreator.OrderCreatorController', {
    extend: 'Ext.app.ViewController',
    requires: [
        "EVEInDust.model.Order"
    ],
    alias: 'controller.OrderCreator',

    init: function(){
        console.log(this.getViewModel().getStore('orders'));
        this.getViewModel().getStore('orders');
    },
    onClickCreateOrderButton: function(){
        var ordersGrid = this.lookupReference("orders-grid"),
            record = new EVEInDust.model.Order(),
            rowEditor = ordersGrid.findPlugin("rowediting")
        ;
        ordersGrid.insert(0, record);
        rowEditor.startEdit(record,0);
    },
    onEditOrderRowComplete: function() {

    }
    
});
