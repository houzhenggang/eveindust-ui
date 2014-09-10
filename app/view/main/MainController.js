Ext.define('EVEInDust.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        "EVEInDust.view.orderCreator.OrderCreator"
    ],

    alias: 'controller.main',

    onClickCreateOrdersButton: function() {
        Ext.widget("OrderCreator").show();
    }
}, null);
