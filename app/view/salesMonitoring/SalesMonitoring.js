
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
        plugins: [{
            ptype: 'rowediting',
            clicksToEdit: 2,
            listeners: {
                edit: 'onEditOrderRowComplete'
            }
        }],
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
            format: "Y-m-d H:i:s",
            editor: {
                xtype: "datefield",
                format: "Y-m-d H:i:s",
                allowBlank: true
            }
        },{
            header: "Дата нач. реализ.",
            dataIndex: "startSellingDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            editor: {
                xtype: "datefield",
                format: "Y-m-d H:i:s",
                allowBlank: true
            }
        },{
            header: "Дата оконч. реализ.",
            dataIndex: "endSellingDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            editor: {
                xtype: "datefield",
                format: "Y-m-d H:i:s",
                allowBlank: true
            }
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
            model: "EVEInDust.model.Item",
            pageSize: 0,
            remoteFilter: true
        },
        columns: [{
            header: "Название",
            dataIndex: "typeId",
            renderer: function(typeId) {
                var record = Ext.getStore("eveoj.InvTypes").findRecord("typeId",typeId);
                if(record){
                    return record.get("typeName");
                } else {
                    return typeId;
                }
            }
        },{
            header: "Остаток (шт)",
            dataIndex: "remainsQuantity"
        },{
            header: "Продано (шт)",
            dataIndex: "soldQuantity"
        },{
            header: "Себестоимость",
            dataIndex: "unitPrimeCost"
        },{
            header: "Ср. цена",
            dataIndex: "avgSellPrice"
        },{
            header: "Доход (ISK)",
            dataIndex: "income"
        },{
            header: "Общ. затраты",
            dataIndex: "overallExpenses"
        },{
            header: "Прибыль",
            renderer: function(emptyValue, meta, item){
                if(+item.get("remainsQuantity") === 0) {
                    return item.get("income")-item.get("overallExpenses");
                } else {
                    return "";
                }
            }
        },{
            header: "Прибыль/шт",
            renderer: function(emptyValue, meta, item){
                if(+item.get("remainsQuantity") === 0) {
                    return (item.get("income")-item.get("overallExpenses"))/item.get("count");
                } else {
                    return "";
                }
            }
        },{
            header: "Прибыль в %",
            renderer: function(emptyValue, meta, item){
                if(+item.get("remainsQuantity") === 0) {
                    return ((item.get("income")/item.get("overallExpenses")-1)*100) + "%"
                } else {
                    return "";
                }
            }
        }]
    }]


});
