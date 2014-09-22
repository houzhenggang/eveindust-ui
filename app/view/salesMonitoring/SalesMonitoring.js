
Ext.define("EVEInDust.view.salesMonitoring.SalesMonitoring",{
    extend: "Ext.window.Window",
    xtype: "SalesMonitoring",
    controller: "SalesMonitoring",
    viewModel: {
        type: "SalesMonitoring"
    },
    requires: [
        "EVEInDust.model.Order",
        "EVEInDust.common.OrderStatuses",
        "EVEInDust.view.salesMonitoring.SalesMonitoringController",
        "EVEInDust.view.salesMonitoring.SalesMonitoringModel"
    ],
    title: "Мониторинг реализации заказов",
    width: 700,
    height: 650,
    closable: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },
    items: [{
        xtype: "grid",
        flex: 1,
        reference: "orders-grid",
        store: {
            model: "EVEInDust.model.Order",
            pageSize: 0,
            remoteFilter: true,
            autoLoad: true,
            filters: [{
                id: "status1",
                property: "status",
                value: EVEInDust.common.OrderStatuses.Forming,
                operator: "!="
            },{
                id: "status2",
                property: "status",
                value: EVEInDust.common.OrderStatuses.Sold,
                operator: "!="
            }]
        },
        columns: [{
            header: "#"
        },{
            header: "Хаб"
        },{
            header: "Дата готовности"
        },{
            header: "Дата нач. реализ."
        },{
            header: "Дата оконч. реализ."
        }]
    },{
        xtype: "grid",
        reference: "itemsToProduce-grid",
        flex: 1,
        store: {
            model: "EVEInDust.model.ItemToProduce",
            pageSize: 0,
            remoteFilter: true
        },
        columns: [{
            header: "Название"
        },{
            header: "Остаток (шт)"
        },{
            header: "Продано (шт)"
        },{
            header: "Доход (ISK)"
        }]
    }]


});
