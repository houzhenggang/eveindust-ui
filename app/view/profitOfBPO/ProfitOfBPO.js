Ext.define("EVEInDust.view.profitOfBPO.ProfitOfBPO", {
    extend: "Ext.window.Window",
    xtype: "ProfitOfBPO",
    controller: "ProfitOfBPO",
    viewModel: {
        type: "ProfitOfBPO"
    },
    requires: [
        "EVEInDust.view.profitOfBPO.ProfitOfBPOController",
        "EVEInDust.view.profitOfBPO.ProfitOfBPOModel"
    ],
    title: "Прибыльность BPO",
    width: 700,
    height: 400,
    closable: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },
    items: [{
        xtype: "grid",
        flex: 1,
        store: {
            fields: [
                {name: "typeId", type: "int"},
                {name: "materialEfficiency", type: "int"},
                {name: "timeEfficiency", type: "int"},
                {name: "profitInPercents", type: "number"},
                {name: "profitPerHour", type: "number"},
                {name: "avgVolume", type: "number"}
            ],
            autoLoad: true,
            remoteFilter: true,
            pageSize: 0,
            filters: [{
                id: "runs",
                property: "runs",
                value: "-1"
            }],
            proxy: {
                "type": "rest",
                "url": "/api/corpblueprints",
                "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
                "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
                "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function(record) {
                if(+record.get("profitPerHour") < 0) {
                    return "red";
                } else {
                    return "little-green";
                }
            }
        },
        columns: [{
            header: "Название",
            dataIndex: "typeName",
            flex: 2
        }, {
            header: "ME",
            dataIndex: "materialEfficiency",
            xtype: "numbercolumn",
            format: "0,000",
            flex: 1/2,
            align: "right"

        }, {
            header: "PE",
            dataIndex: "timeEfficiency",
            xtype: "numbercolumn",
            format: "0,000",
            flex: 1/2,
            align: "right"
        },{
            header: "Объем",
            dataIndex: "avgVolume",
            xtype: "numbercolumn",
            format: "0,000",
            align: "right",
            flex: 1
        },{
            header: "ISK/ч",
            dataIndex: "profitPerHour",
            xtype: "numbercolumn",
            format: "0,000.00",
            align: "right",
            flex: 1
        }, {
            header: "%",
            dataIndex: "profitInPercents",
            xtype: "numbercolumn",
            format: "0,000.00",
            align: "right",
            flex: 1
        }]
    }]
});
