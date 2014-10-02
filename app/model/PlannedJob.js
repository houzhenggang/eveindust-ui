Ext.define("EVEInDust.model.PlannedJob", {
    extend: "Ext.data.Model",
    uses: [
        'EVEInDust.model.Item'
    ],
    idProperty: "id",
    fields: [
        {
            name: "id",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "bpItemId",
            type: "int"
        },
        {
            name: "facilityMeBonus",
            type: "float"
        },
        {
            name: "runs",
            type: "int"
        },
        {
            name: "item_id",
            type: "int",
            useNull: true
        }
    ],
    validations: [
        {
            type: "presence",
            field: "bpItemId"
        },
        {
            type: "presence",
            field: "facilityMeBonus"
        },
        {
            type: "presence",
            field: "runs"
        }
    ],
    associations: [
        {
            type: 'belongsTo',
            name: 'item',
            associationKey: 'item',
            foreignKey: 'item_id',
            instanceName: 'item',
            model: 'EVEInDust.model.Item',
            getterName: 'getItem',
            setterName: 'setItem'
        }
    ],
    proxy: {"type": "rest", "url": "/api/plannedjobs", "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"}, "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"}, "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}}
});
