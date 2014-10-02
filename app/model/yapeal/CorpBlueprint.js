Ext.define("EVEInDust.model.yapeal.CorpBlueprint", {
    extend: "Ext.data.Model",
    uses: [
    ],
    idProperty: "itemId",
    fields: [
        {
            name: "locationId",
            type: "int"
        },
        {
            name: "typeId",
            type: "int"
        },
        {
            name: "typeName",
            type: "string"
        },
        {
            name: "flagId",
            type: "int"
        },
        {
            name: "quantity",
            type: "int"
        },
        {
            name: "timeEfficiency",
            type: "int"
        },
        {
            name: "materialEfficiency",
            type: "int"
        },
        {
            name: "runs",
            type: "int"
        },
        {
            name: "ownerId",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "itemId",
            type: "int",
            useNull: true,
            persist: false
        }
    ],
    validations: [
        {
            type: "presence",
            field: "locationId"
        },
        {
            type: "presence",
            field: "typeId"
        },
        {
            type: "presence",
            field: "typeName"
        },
        {
            type: "presence",
            field: "flagId"
        },
        {
            type: "presence",
            field: "quantity"
        },
        {
            type: "presence",
            field: "timeEfficiency"
        },
        {
            type: "presence",
            field: "materialEfficiency"
        },
        {
            type: "presence",
            field: "runs"
        }
    ],
    associations: [
    ],
    proxy: {"type": "rest", "url": "/api/yapeal/corpblueprints", "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"}, "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"}, "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}}
});
