
Ext.define("EVEInDust.view.tradeHubEditor.TradeHubEditor",{
    extend: "Ext.window.Window",
    xtype: 'TradeHubEditor',
    requires: [
        'EVEInDust.view.tradeHubEditor.TradeHubEditorController',
        'EVEInDust.view.tradeHubEditor.TradeHubEditorModel',
        'EVEInDust.view.tradeHubEditor.createHubForm.CreateHubForm'
    ],
    controller: "TradeHubEditor",
    viewModel: {
        type: "TradeHubEditor"
    },
    modal: true,
    items: [{
        xtype: 'grid',
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
