
Ext.define("EVEInDust.view.orderCreator.OrderCreator",{
    extend: "Ext.window.Window",
    requires: [
        'EVEInDust.view.orderCreator.OrderCreatorController',
        'EVEInDust.view.orderCreator.OrderCreatorModel'
    ],
    xtype: "OrderCreator",
    controller: "OrderCreator",
    viewModel: {
        type: "OrderCreator"
    },

    width: 700,
    height: 400,

    closable: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },

    items: [{
        xtype: "panel",
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },

        items: [{
            xtype: "grid",
            title: "Заказы",
            reference: "orders-grid",
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 2,
                listeners: {
                    edit: 'onEditOrderRowComplete',
                    canceledit: 'onCancelEditOrderRow'
                }
            }],
            store: {
                model: 'EVEInDust.model.Order',
                remoteSort: true,
                remoteFilter: true,
                autoLoad: true
            },
            flex: 1,
            tbar: {
                items: [{
                    text: "Создать",
                    handler: "onClickCreateOrderButton"
                },{
                    text: "Удалить",
                    handler: "onClickDeleteOrderButton"
                }]
            },
            columns: [{
                header: "#",
                flex: 25/100,
                dataIndex: "id"
            },{
                header: "Торговый хаб",
                flex: 1,
                dataIndex: "stationId",
                renderer: function(value){
                    var record = Ext.getStore("TradeHubs").findRecord("stationId",value);

                    if(record) {
                        return record.get("name");
                    } else {
                        return value;
                    }
                },
                editor: {
                    xtype: "combo",
                    allowBlank: false,
                    queryMode: 'local',
                    bind: {
                        store: "{hubs}"
                    },
                    displayField: 'name',
                    valueField: 'stationId',
                    forceSelection: true,
                    typeAhead: true
                }
            }]
        },{
            xtype: "grid",
            title: "Предметы для произв-ва",
            flex: 2,
            columns: [{
                header: "#"
            },{
                header: "Название"
            },{
                header: "План"
            },{
                header: "В произв-ве"
            }]
        }]
    },{
        xtype: "grid",
        flex: 1,
        title: "Список непривязанных работ",
        columns: [{
            header: "#",
            flex: 1
        },{
            header: "Название",
            flex: 2
        },{
            header: "Дата",
            flex: 1
        }]
    }]
});
