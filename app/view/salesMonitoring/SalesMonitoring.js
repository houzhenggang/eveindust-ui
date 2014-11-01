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
    width: 1050,
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
        bbar: {
            items: [{
                iconCls: "x-tbar-loading",
                handler: function(button){
                    button.up("grid").getStore().load();
                }
            }]
        },
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
            dataIndex: "id",
            flex: 1/2
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
            },
            flex: 1
        },{
            header: "Дата готовности",
            dataIndex: "readyDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            editor: {
                xtype: "datefield",
                format: "Y-m-d H:i:s",
                allowBlank: true
            },
            flex: 2
        },{
            header: "Дата нач. реализ.",
            dataIndex: "startSellingDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            editor: {
                xtype: "datefield",
                format: "Y-m-d H:i:s",
                allowBlank: true
            },
            flex: 2
        }],
        listeners: {
            itemclick: "onItemClickInOrderGrid"
        }
    },{
        xtype: "grid",
        reference: "items-grid",
        title: "Продаваемые товары",
        flex: 1,
        store:{
            model: "EVEInDust.model.Item",
            pageSize: 0,
            remoteFilter: true
        },
        listeners: {
            selectionchange: "onSelectionChangeInItemsGrid"
        },
        tbar: {
            items: [{
                text: "Пометить как проданный",
                handler: "onClickMarkItemAsSoldItem",
                tooltip: "Помечает выбранный товар как проданный. Будьте внимательны, это является крайней мерой на случай непредвиденных ошибок",
                disabled: true,
                action: "markAsSold"
            }]
        },
        bbar: {
            items: [{
                iconCls: "x-tbar-loading",
                handler: function(button){
                    button.up("grid").getStore().load();
                }
            }]
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function(item) {
                var percent;
                if(+item.get("remainsQuantity") <= 0) {
                    percent = (item.get("income")/item.get("overallExpenses")-1)*100;
                    if(percent < 0)
                        return "red";
                    else
                        return "little-green";
                } else {
                    return "";
                }
            }
        },
        columns: [{
            header: "Название",
            dataIndex: "typeId",
            flex: 2,
            renderer: function(typeId) {
                var record = Ext.getStore("eveoj.InvTypes").findRecord("typeId",typeId);
                if(record){
                    return record.get("typeName");
                } else {
                    return typeId;
                }
            }
        },{
            xtype: "numbercolumn",
            header: "Остаток (шт)",
            dataIndex: "remainsQuantity",
            format: "0,000",
            align: "right"
        },{
            xtype: "numbercolumn",
            header: "Продано (шт)",
            dataIndex: "soldQuantity",
            format: "0,000",
            align: "right"
        },{
            header: "Себестоимость",
            xtype: "numbercolumn",
            dataIndex: "unitPrimeCost",
            format: "0,000.00",
            align: "right"
        },{
            header: "Ср. цена",
            xtype: "numbercolumn",
            dataIndex: "avgSellPrice",
            format: "0,000.00",
            align: "right"
        },{
            header: "Доход (ISK)",
            xtype: "numbercolumn",
            dataIndex: "income",
            format: "0,000.00",
            align: "right",
            flex: 3/2
        },{
            header: "Общ. затраты",
            xtype: "numbercolumn",
            dataIndex: "overallExpenses",
            format: "0,000.00",
            align: "right",
            flex: 3/2
        },{
            header: "Прибыль",
            xtype: "numbercolumn",
            renderer: function(emptyValue, meta, item){
                if(+item.get("remainsQuantity") <= 0) {
                    return Ext.util.Format.number(item.get("income")-item.get("overallExpenses"),"0,000.00");
                } else {
                    return "";
                }
            },
            align: "right",
            flex: 3/2
        },{
            header: "Прибыль в %",
            xtype: "numbercolumn",
            renderer: function(emptyValue, meta, item){
                if(+item.get("remainsQuantity") <= 0) {
                    return Ext.util.Format.number((item.get("income")/item.get("overallExpenses")-1)*100,"0.00")+"%"
                } else {
                    return "";
                }
            },
            align: "right"
        }]
    }]


});
