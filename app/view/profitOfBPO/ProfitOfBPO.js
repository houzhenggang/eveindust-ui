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
    width: 400,
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
                {name: "profitInPercents", type: "int"},
                {name: "profitPerHour", type: "int"}
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
        columns: [{
            header: "Название",
            dataIndex: "typeName"
        }, {
            header: "ME",
            dataIndex: "materialEfficiency"
        }, {
            header: "PE",
            dataIndex: "timeEfficiency"
        },{
            header: "Ожид прибыль/ч",
            dataIndex: "profitPerHour",
            xtype: "numbercolumn",
            format: "0,000.00",
            align: "right"
        }, {
            header: "Ожид. прибыль %",
            dataIndex: "profitInPercents",
            xtype: "numbercolumn",
            format: "0,000.00",
            align: "right"
        }]
    }]
});
