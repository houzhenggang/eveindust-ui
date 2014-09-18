
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
    items: [{
        xtype: 'grid',
        flex: 1,
        store: "TradeHubs",
        reference: "hubs-grid",
        plugins: [{
            ptype: 'rowediting',
            clicksToEdit: 2,
            listeners: {
                edit: 'onEditRowComplete',
                canceledit: 'onCancelEditRow'
            }
        }],
        tbar: {
            items: [{
                text: "Создать",
                handler: "onClickCreateTradeHubButton"
            },{
                text: "Удалить",
                handler: "onClickDeleteTradeHubButton"
            }]
        },
        columns: [{
            header: "StationID",
            dataIndex: "stationId",
            flex: 1,
            editor: {
                allowBlank: false
            }
        },{
            header: "Название",
            dataIndex: "name",
            flex: 2,
            editor: {
                allowBlank: false
            }
        }]
    }]

});
