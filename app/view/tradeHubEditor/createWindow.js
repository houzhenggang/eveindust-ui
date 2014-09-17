Ext.define("EVEInDust.view.tradeHubEditor.CreateWindow",{
    extend: "Ext.window.Window",
    xtype: 'tradeHubEditor.CreateWindow',
    model: 'EVEInDust.model.TradeHub',
    title: "Создание Торгового Хаба",
    border: false,
    modal: true,
    items: [{
        xtype: 'form',
        bodyPadding: 5,
        items: [{
            fieldLabel: "Название",
            xtype: "textfield",
            bind: '{hub.name}',
            allowBlank: false
        },{
            fieldLabel: "StationID",
            xtype: "numberfield",
            minValue: 0,
            allowDecimals: false,
            allowBlank: false,
            bind: "{hub.stationId}"
        }],
        buttons: [{
            text: "Отмена",
            handler: "onClickCancelButton"
        },{
            text: "Сохранить",
            formBind: true,
            disabled: true,
            handler: "onClickSaveHubButton"
        }]
    }]
});