Ext.define('EVEInDust.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        "EVEInDust.view.orderCreator.OrderCreator",
        "EVEInDust.view.tradeHubEditor.TradeHubEditor",
        "EVEInDust.view.salesMonitoring.SalesMonitoring",
        "EVEInDust.view.profitOfBPO.ProfitOfBPO",
        "EVEInDust.view.charactersMonitor.CharactersMonitor",
        "EVEInDust.view.overviewBPCRuns.OverviewBPCRuns",
        "EVEInDust.view.salesHistory.SalesHistory",
        "EVEInDust.view.salesItemsHistory.SalesItemsHistory"
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
    },
    onClickProfitOfBPOButton: function(){
        Ext.widget("ProfitOfBPO").show();
    },
    onClickCharactersMonitorButton: function(){
        Ext.widget("CharactersMonitor").show();
    },
    onClickOverviewBPCRuns: function(){
        Ext.widget("OverviewBPCRuns").show();
    },
    onClickSalesHistoryButton: function(){
        Ext.widget("SalesHistory").show();
    },
    onClickItemsSalesHistoryButton: function(){
        Ext.widget("SalesItemsHistory").show();
    }
}, null);
