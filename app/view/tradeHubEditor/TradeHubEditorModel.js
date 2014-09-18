Ext.define('EVEInDust.view.tradeHubEditor.TradeHubEditorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TradeHubEditor',
    requires: [
        "EVEInDust.store.TradeHubs"
    ],
    data: {
        name: 'EVEInDust'
    },
    stores: {
        'tradehubToGrid': {
            source: "TradeHubs",
            pageSize: 25
        }
    }

});
