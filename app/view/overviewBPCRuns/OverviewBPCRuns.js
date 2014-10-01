Ext.define("EVEInDust.view.overviewBPCRuns.OverviewBPCRuns", {
    extend: "Ext.window.Window",
    xtype: "OverviewBPCRuns",
    controller: "OverviewBPCRuns",
    viewModel: {
        type: "OverviewBPCRuns"
    },
    requires: [
        "EVEInDust.view.overviewBPCRuns.OverviewBPCRunsController",
        "EVEInDust.view.overviewBPCRuns.OverviewBPCRunsModel"
    ],
    title: "Обзор BPC",
    width: 300,
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
                {name: "typeName", type: "string"},
                {name: "runs", type: "int"}
            ],
            autoLoad: true,
            remoteFilter: true,
            pageSize: 0,
            proxy: {
                "type": "rest",
                "url": "/api/overallbpcrunsdatas",
                "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
                "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
            }
        },
        columns: [{
            header: "Название",
            dataIndex: "typeName",
            flex: 2
        }, {
            header: "Runs",
            dataIndex: "runs",
            xtype: "numbercolumn",
            format: "0,000",
            flex: 1/2,
            align: "right"
        }]
    }]
});
