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
            name: "name",
            xtype: "textfield",
            allowBlank: false
        },{
            fieldLabel: "StationID",
            name: "stationId",
            xtype: "numberfield",
            minValue: 0,
            allowDecimals: false,
            allowBlank: false
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