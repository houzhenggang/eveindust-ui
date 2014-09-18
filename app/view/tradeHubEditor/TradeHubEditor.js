
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
    layout: {
        type: "hbox",
        align: "stretch"
    },
    width: 400,
    height: 400,
    session: true,
    modal: true,
    items: [{
        xtype: 'grid',
        flex: 1,
        store: "TradeHubs",
        tbar: {
            items: [{
                text: "Создать",
                handler: "onClickCreateTradeHubButton"
            }]
        },
        columns: [{
            header: "StationID",
            dataIndex: "stationId",
            flex: 1
        },{
            header: "Название",
            dataIndex: "name",
            flex: 2
        }]
    }]

});
