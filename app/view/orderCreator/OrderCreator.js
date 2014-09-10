
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

    closable: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },

    items: [{
        xtype: "panel",
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: "grid",
            title: "Заказы",
            flex: 1,
            columns: [{
                header: "#",
                flex: 25/100
            },{
                header: "Торговый хаб",
                flex: 1
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
