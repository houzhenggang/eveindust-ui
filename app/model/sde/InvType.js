Ext.define("EVEInDust.model.sde.InvType", {
    extend: "Ext.data.Model",
    uses: [],
    idProperty: "typeId",
    fields: [
        {
            name: "groupId",
            type: "int",
            useNull: true
        },
        {
            name: "typeName",
            type: "string",
            useNull: true
        },
        {
            name: "description",
            type: "string",
            useNull: true
        },
        {
            name: "mass",
            type: "float",
            useNull: true
        },
        {
            name: "volume",
            type: "float",
            useNull: true
        },
        {
            name: "capacity",
            type: "float",
            useNull: true
        },
        {
            name: "portionSize",
            type: "int",
            useNull: true
        },
        {
            name: "raceId",
            type: "boolean",
            useNull: true
        },
        {
            name: "basePrice",
            type: "float",
            useNull: true
        },
        {
            name: "published",
            type: "boolean",
            useNull: true
        },
        {
            name: "marketGroupId",
            type: "int",
            useNull: true
        },
        {
            name: "chanceOfDuplicating",
            type: "float",
            useNull: true
        },
        {
            name: "typeId",
            type: "int",
            useNull: true,
            persist: false
        }
    ],
    validations: [
        {
            type: "presence",
            field: "groupId"
        },
        {
            type: "presence",
            field: "typeName"
        },
        {
            type: "presence",
            field: "description"
        },
        {
            type: "presence",
            field: "mass"
        },
        {
            type: "presence",
            field: "volume"
        },
        {
            type: "presence",
            field: "capacity"
        },
        {
            type: "presence",
            field: "portionSize"
        },
        {
            type: "presence",
            field: "raceId"
        },
        {
            type: "presence",
            field: "basePrice"
        },
        {
            type: "presence",
            field: "published"
        },
        {
            type: "presence",
            field: "marketGroupId"
        },
        {
            type: "presence",
            field: "chanceOfDuplicating"
        }
    ],
    associations: [],
    proxy: {
        "type": "rest",
        "url": "/api/sde/invtypes",
        "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
        "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
        "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
    }
});
