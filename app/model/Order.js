Ext.define("EVEInDust.model.Order", {
    extend: "Ext.data.Model",
    uses: [
        'EVEInDust.model.OrderStatus'
    ],
    idProperty: "id",
    fields: [
        {
            name: "stationId",
            type: "int"
        },
        {
            name: "id",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "status_id",
            type: "int"
        }
    ],
    validations: [
        {
            type: "presence",
            field: "stationId"
        },
        {
            type: "presence",
            field: "status_id"
        }
    ],
    associations: [
        {
            type: 'belongsTo',
            name: 'status',
            associationKey: 'status',
            foreignKey: 'status_id',
            instanceName: 'status',
            model: 'EVEInDust.model.OrderStatus',
            getterName: 'getStatus',
            setterName: 'setStatus'
        }
    ],
    proxy: {"type": "rest", "url": "/api/orders", "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"}, "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"}, "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}}
});
