Ext.define("EVEInDust.view.tradeHubEditor.CreateHubForm",{
    extend: "Ext.window.Window",
    xtype: 'tradeHubEditor.CreateHubForm',
    title: "Создание Торгового Хаба",
    border: false,
    items: [{
        xtype: 'form',
        bodyPadding: 5,
        items: [{
            fieldLabel: "Название",
            xtype: "textfield",
            allowBlank: false
        },{
            fieldLabel: "StationID",
            xtype: "numberfield",
            minValue: 0,
            allowDecimals: false,
            allowBlank: false
        }],
        buttons: [{
            text: "Сохранить",
            formBind: true,
            disabled: true,
            handler: "onClickSaveButton"
        }]
    }]
});