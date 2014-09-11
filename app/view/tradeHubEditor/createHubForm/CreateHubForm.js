
Ext.define("EVEInDust.view.tradeHubEditor.createHubForm.CreateHubForm",{
    extend: "Ext.window.Window",
    requires: [
        'EVEInDust.view.tradeHubEditor.createHubForm.CreateHubFormController',
        'EVEInDust.view.tradeHubEditor.createHubForm.CreateHubFormModel'
    ],
    xtype: 'tradeHubEditor.CreateHubForm',
    controller: "tradeHubEditor-createHubForm",
    viewModel: {
        type: "tradeHubEditor-createHubForm"
    },
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
