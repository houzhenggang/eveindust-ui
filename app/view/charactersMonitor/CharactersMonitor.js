Ext.define("EVEInDust.view.charactersMonitor.CharactersMonitor", {
    extend: "Ext.window.Window",
    xtype: "CharactersMonitor",
    controller: "CharactersMonitor",
    viewModel: {
        type: "CharactersMonitor"
    },
    requires: [
        "EVEInDust.view.charactersMonitor.CharactersMonitorController",
        "EVEInDust.view.charactersMonitor.CharactersMonitorModel"
    ],
    title: "Мониторинг персонажен",
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
                {name: "name", type: "string"},
                {name: "overallManufactureSlots", type: "int"},
                {name: "overallOccupiedManufactureSlots", type: "int"},
                {name: "overallScienceSlots", type: "int"},
                {name: "overallOccupiedScienceSlots", type: "int"}
            ],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                "type": "rest",
                "url": "/api/charcharactersheets",
                "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
                "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
                "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
            }
        },
        viewConfig: {
            stripeRows: false,
            getRowClass: function(record) {
                if(
                    +record.get("overallOccupiedManufactureSlots") < +record.get("overallManufactureSlots") ||
                    +record.get("overallOccupiedScienceSlots") < +record.get("overallScienceSlots")
                ) {
                    return "red";
                } else {
                    return "little-green";
                }
            }
        },
        bbar: {
            items: [{
                iconCls: "x-tbar-loading",
                handler: function(button){
                    button.up("grid").getStore().load();
                }
            }]
        },
        columns: [{
            header: "Имя",
            dataIndex: "name",
            flex: 2
        }, {
            header: "Manufacture",
            renderer: function(noValue, meta, record){
                return record.get("overallOccupiedManufactureSlots") + "/" + record.get("overallManufactureSlots");
            }
        }, {
            header: "Science",
            renderer: function(noValue, meta, record){
                return record.get("overallOccupiedScienceSlots") + "/" + record.get("overallScienceSlots");
            }
        }]
    }]
});
