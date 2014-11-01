Ext.define("EVEInDust.model.IgnoredJob", {
    extend: "Ext.data.Model",
    uses: [],
    idProperty: "id",
    fields: [
        {
            name: "id",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "jobId",
            type: "int"
        }
    ],
    validations: [
        {
            type: "presence",
            field: "jobId"
        }
    ],
    associations: [],
    proxy: {
        "type": "rest",
        "url": "/api/ignoredjobs",
        "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
        "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
        "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
    }
});
