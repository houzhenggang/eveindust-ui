Ext.define('EVEInDust.view.tradeHubEditor.TradeHubEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TradeHubEditor',
    onClickCreateTradeHubButton: function(){
        Ext.widget("tradeHubEditor.CreateHubForm").show();
    }
    
});
