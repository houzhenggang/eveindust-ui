
Ext.define("EVEInDust.view.tradeHubEditor.TradeHubEditor",{
    extend: "Ext.window.Window",
    xtype: 'TradeHubEditor',
    requires: [
        'EVEInDust.view.tradeHubEditor.TradeHubEditorController',
        'EVEInDust.view.tradeHubEditor.TradeHubEditorModel',
        'EVEInDust.view.tradeHubEditor.CreateWindow',
        "EVEInDust.store.TradeHubs"
    ],
    controller: "TradeHubEditor",
    viewModel: {
        type: "TradeHubEditor"
    },
    session: true,
    modal: true,
    items: [{
        xtype: 'grid',
        store: "TradeHubs",
        tbar: {
            items: [{
                text: "Создать",
                handler: "onClickCreateTradeHubButton"
            }]
        },
        columns: [{
            header: "StationID"
        },{
            header: "Название"
        }]
    }]

});
