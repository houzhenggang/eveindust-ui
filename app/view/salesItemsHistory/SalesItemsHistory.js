Ext.define("EVEInDust.view.salesItemsHistory.SalesItemsHistory", {
    extend: "Ext.window.Window",
    xtype: "SalesItemsHistory",
    controller: "SalesItemsHistory",
    viewModel: {
        type: "SalesItemsHistory"
    },
    requires: [
        "EVEInDust.view.salesItemsHistory.SalesItemsHistoryController",
        "EVEInDust.view.salesItemsHistory.SalesItemsHistoryModel"
    ],
    title: "История по товарам",
    width: 1050,
    height: 650,
    closable: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },
    items: [{
        xtype: "grid",
        reference: "items-grid",
        title: "Продаваемые товары",
        flex: 1,
        features: [{
            ftype: 'grouping',
            groupHeaderTpl: [
                '{name:this.getHubNameByID}',
                {
                    getHubNameByID: function (stationId) {
                        var record = Ext.getStore("TradeHubs").findRecord("stationId", stationId);

                        if (record) {
                            return record.get("name");
                        } else {
                            return stationId;
                        }
                    }
                }
            ],
            id: 'stationGrouping'
        }],
        store: {
            fields: [
                {name: 'stationId', type: 'int'},
                {name: 'typeId', type: 'int'},
                {name: 'income', type: 'number'},
                {name: 'avgUnitPriceCost', type: 'number'},
                {name: 'avgSellPrice', type: 'number'},
                {name: 'overallExpenses', type: 'number'},
                {name: 'soldQuantity', type: 'number'},
                {
                    name: 'profit',
                    calculate: function (rawdata) {
                        return rawdata['income'] - rawdata['overallExpenses'];
                    }
                }, {
                    name: 'profitInPercents',
                    calculate: function (rawdata) {
                        return (rawdata['income'] / rawdata['overallExpenses'] - 1) * 100;
                    }
                }
            ],
            pageSize: 0,
            groupField: 'stationId'
        },
        listeners: {
            afterrender: 'onAfterRenderItemsGrid'
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
                percent = (item.get("income") / item.get("overallExpenses") - 1) * 100;
                if (percent < 0)
                    return "red";
                else
                    return "little-green";
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
            dataIndex: "avgUnitPriceCost",
            format: "0,000.00",
            align: "right"
        }, {
            header: "Ср. цена",
            xtype: "numbercolumn",
            dataIndex: "avgSellPrice",
            format: "0,000.00",
            align: "right"
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
            dataIndex: "income",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Прибыль",
            dataIndex: "profit",
            xtype: "numbercolumn",
            format: "0,000.00",
            align: "right",
            flex: 3 / 2
        }, {
            header: "Прибыль в %",
            xtype: "numbercolumn",
            renderer: function (emptyValue, meta, item) {
                return Ext.util.Format.number((item.get("income") / item.get("overallExpenses") - 1) * 100, "0.00") + "%"
            },
            align: "right",
            flex: 1
        }]
    }]
});
