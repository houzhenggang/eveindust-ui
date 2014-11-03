Ext.define("EVEInDust.view.salesHistory.SalesHistory", {
    extend: "Ext.window.Window",
    xtype: "SalesHistory",
    controller: "SalesHistory",
    viewModel: {
        type: "SalesHistory"
    },
    requires: [
        "EVEInDust.model.Order",
        "EVEInDust.common.OrderStatuses",
        "EVEInDust.view.salesHistory.SalesHistoryController",
        "EVEInDust.view.salesHistory.SalesHistoryModel"
    ],
    title: "История реализации заказов",
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
        bbar: {
            items: [{
                iconCls: "x-tbar-loading",
                handler: function (button) {
                    button.up("grid").getStore().load();
                }
            }]
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (order) {
                var percent;
                percent = (order.get("totalIncome") / order.get("overallExpenses") - 1) * 100;
                if (percent < 0)
                    return "little-red";
                else
                    return "little-green";
            }
        },
        store: {
            model: "EVEInDust.model.Order",
            pageSize: 0,
            remoteFilter: true,
            autoLoad: true,
            filters: [{
                id: "status_sold",
                property: "status",
                value: EVEInDust.common.OrderStatuses.Sold
            }]
        },
        columns: [{
            header: "#",
            dataIndex: "id",
            flex: 1 / 2
        }, {
            header: "Хаб",
            dataIndex: "stationId",
            renderer: function (stationId) {
                var record = Ext.getStore("TradeHubs").findRecord("stationId", stationId);

                if (record) {
                    return record.get("name");
                } else {
                    return stationId;
                }
            },
            flex: 1
        }, {
            header: "Дата готовности",
            dataIndex: "readyDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            flex: 2
        }, {
            header: "Дата нач. реализ.",
            dataIndex: "startSellingDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            flex: 2
        }, {
            header: "Дата оконч. реализ.",
            dataIndex: "endSellingDate",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            flex: 2
        }, {
            header: "Общ. затраты",
            xtype: "numbercolumn",
            dataIndex: "overallExpenses",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Доход (ISK)",
            xtype: "numbercolumn",
            dataIndex: "totalIncome",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Прибыль",
            dataIndex: "totalProfit",
            xtype: "numbercolumn",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Прибыль в %",
            xtype: "numbercolumn",
            renderer: function (emptyValue, meta, order) {
                return Ext.util.Format.number((order.get("totalIncome") / order.get("overallExpenses") - 1) * 100, "0.00") + "%"
            },
            align: "right"
        }],
        listeners: {
            itemclick: "onItemClickInOrderGrid"
        }
    }, {
        xtype: "grid",
        reference: "items-grid",
        title: "Продаваемые товары",
        flex: 1,
        store: {
            model: "EVEInDust.model.Item",
            pageSize: 0,
            remoteFilter: true
        },
        listeners: {
            selectionchange: "onSelectionChangeInItemsGrid"
        },
        bbar: {
            items: [{
                iconCls: "x-tbar-loading",
                handler: function (button) {
                    button.up("grid").getStore().load();
                }
            }]
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function (item) {
                var percent;
                if (item.get("isSoldOut")) {
                    percent = (item.get("income") / item.get("overallExpenses") - 1) * 100;
                    if (percent < 0)
                        return "little-red";
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
            renderer: function (typeId) {
                var record = Ext.getStore("eveoj.InvTypes").findRecord("typeId", typeId);
                if (record) {
                    return record.get("typeName");
                } else {
                    return typeId;
                }
            }
        }, {
            xtype: "numbercolumn",
            header: "Продано (шт)",
            dataIndex: "soldQuantity",
            format: "0,000",
            align: "right"
        }, {
            header: "Себестоимость",
            xtype: "numbercolumn",
            dataIndex: "unitPrimeCost",
            format: "0,000.00",
            align: "right"
        }, {
            header: "Ср. цена",
            xtype: "numbercolumn",
            dataIndex: "avgSellPrice",
            format: "0,000.00",
            align: "right"
        }, {
            header: "Доход (ISK)",
            xtype: "numbercolumn",
            dataIndex: "income",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Общ. затраты",
            xtype: "numbercolumn",
            dataIndex: "overallExpenses",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Прибыль",
            xtype: "numbercolumn",
            renderer: function (emptyValue, meta, item) {
                if (item.get("isSoldOut")) {
                    return Ext.util.Format.number(item.get("income") - item.get("overallExpenses"), "0,000.00");
                } else {
                    return "";
                }
            },
            align: "right",
            flex: 3 / 2
        }, {
            header: "Прибыль в %",
            xtype: "numbercolumn",
            renderer: function (emptyValue, meta, item) {
                if (item.get("isSoldOut")) {
                    return Ext.util.Format.number((item.get("income") / item.get("overallExpenses") - 1) * 100, "0.00") + "%"
                } else {
                    return "";
                }
            },
            align: "right",
            flex: 1
        }, {
            header: "Дата последней продажи",
            dataIndex: "lastTransactionDatetime",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            flex: 1
        }]
    }]
});
