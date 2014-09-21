Ext.define("EVEInDust.model.sde.IndustryActivityProduct", {
    extend: "Ext.data.Model",
    uses: [],
    idProperty: "id",
    fields: [
        {
            name: "typeid",
            type: "int",
            useNull: true
        },
        {
            name: "activityId",
            type: "int",
            useNull: true
        },
        {
            name: "productTypeId",
            type: "int",
            useNull: true
        },
        {
            name: "quantity",
            type: "int",
            useNull: true
        },
        {
            name: "id",
            type: "int",
            useNull: true,
            persist: false
        }
    ],
    validations: [
        {
            type: "presence",
            field: "typeid"
        },
        {
            type: "presence",
            field: "activityId"
        },
        {
            type: "presence",
            field: "productTypeId"
        },
        {
            type: "presence",
            field: "quantity"
        }
    ],
    associations: [],
    proxy: {
        "type": "rest",
        "url": "/api/sde/industryactivityproducts",
        "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
        "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
        "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
    }
});
