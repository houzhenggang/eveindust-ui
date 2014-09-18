
Ext.define("EVEInDust.view.orderCreator.OrderCreator",{
    extend: "Ext.window.Window",
    requires: [
        'EVEInDust.view.orderCreator.OrderCreatorController',
        'EVEInDust.view.orderCreator.OrderCreatorModel',
        "EVEInDust.store.Orders"
    ],
    xtype: "OrderCreator",
    controller: "OrderCreator",
    viewModel: {
        type: "OrderCreator"
    },

    width: 400,
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
                    edit: 'onEditOrderRowComplete'
                }
            }],
            store: "Orders",
            flex: 1,
            tbar: {
                items: [{
                    text: "Добавить заказ",
                    handler: "onClickCreateOrderButton"
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
                    console.log(this.getViewModel());
                    return value;
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
