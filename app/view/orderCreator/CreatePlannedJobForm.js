Ext.define("EVEInDust.view.orderCreator.CreatePlannedJobForm", {
    extend: "Ext.window.Window",
    requires: [
        "Ext.form.FieldSet"
    ],
    title: "Создание плановой работы",
    modal: true,
    layout: "fit",
    items: [{
        xtype: "form",
        model: "EVEInDust.model.PlannedJob",
        reference: "createPlannedJobForm",
        bodyPadding: 5,
        layout: {
            type: "vbox",
            align: "stretch"
        },
        items: [{
            xtype: "combo",
            reference: "createPlannedJobForm_bpccombo",
            fieldLabel: "BPC",
            name: "bpItemId",
            queryMode: 'local',
            displayField: 'runs',
            valueField: 'itemId',
            forceSelection: true,
            editable: false,
            allowBlank: false
        },{
            xtype: "numberfield",
            name: "facilityMeBonus",
            fieldLabel: "ME коэффициент",
            allowBlank: false,
            value: 1
        },{
            xtype: "numberfield",
            name: "runs",
            fieldLabel: "Кол-во ранов",
            allowBlank: false
        }],
        buttons: [{
            text: "Сохранить",
            formBind: true,
            disabled: true,
            handler: "onClickSavePlannedJob"
        }]
    }]
}, null);