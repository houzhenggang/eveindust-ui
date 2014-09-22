Ext.define('EVEInDust.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        "EVEInDust.view.orderCreator.OrderCreator",
        "EVEInDust.view.tradeHubEditor.TradeHubEditor",
        "EVEInDust.view.salesMonitoring.SalesMonitoring"
    ],

    alias: 'controller.main',

    onClickCreateOrdersButton: function() {
        Ext.widget("OrderCreator").show();
    },
    onClickTradeHubEditorButton: function(){
        Ext.widget("TradeHubEditor").show()
    },
    onClickSalesMonitoringButton: function(){
        Ext.widget("SalesMonitoring").show();
    }
}, null);
