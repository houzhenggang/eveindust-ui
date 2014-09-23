
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
        title: "Заказы",
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
            header: "#",
            dataIndex: "id"
        },{
            header: "Хаб",
            dataIndex: "stationId",
            renderer: function(stationId){
                var record = Ext.getStore("TradeHubs").findRecord("stationId",stationId);

                if(record) {
                    return record.get("name");
                } else {
                    return stationId;
                }
            }
        },{
            header: "Дата готовности",
            dataIndex: "readyDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s"
        },{
            header: "Дата нач. реализ."
        },{
            header: "Дата оконч. реализ."
        }],
        listeners: {
            itemclick: "onItemClickInOrderGrid"
        }
    },{
        xtype: "grid",
        reference: "itemsToProduce-grid",
        title: "Продаваемые товары",
        flex: 1,
        store:{
            pageSize: 0,
            remoteFilter: true,
            fields: [
                { name: "id", type: "int"},
                { name: "typeId", type: "int"},
                { name: "itemsSold", type: "int"},
                { name: "itemsRemains", type: "int"},
                { name: "income", type: "int"}
            ],
            proxy: {
                "type": "rest",
                "url": "/api/itemsale",
                "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
                "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
                "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
            }
        },
        columns: [{
            header: "Название",
            dataIndex: "typeId"
        },{
            header: "Остаток (шт)",
            dataIndex: "itemsRemains"
        },{
            header: "Продано (шт)",
            dataIndex: "itemsSold"
        },{
            header: "Доход (ISK)",
            dataIndex: "income"
        }]
    }]


});
