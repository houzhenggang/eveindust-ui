Ext.define("EVEInDust.model.ItemToProduce", {
    extend: "Ext.data.Model",
    uses: [
        'EVEInDust.model.Order'
    ],
    idProperty: "id",
    fields: [
        {
            name: "typeId",
            type: "int"
        },
        {
            name: "count",
            type: "int"
        },
        {
            name: "id",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "order_id",
            type: "int"
        }
    ],
    validations: [
        {
            type: "presence",
            field: "typeId"
        },
        {
            type: "presence",
            field: "count"
        },
        {
            type: "presence",
            field: "order_id"
        }
    ],
    associations: [
        {
            type: 'belongsTo',
            name: 'order',
            associationKey: 'order',
            foreignKey: 'order_id',
            instanceName: 'order',
            model: 'EVEInDust.model.Order',
            getterName: 'getOrder',
            setterName: 'setOrder'
        }
    ],
    proxy: {"type": "rest", "url": "/api/itemtoproduces", "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"}, "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"}, "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}}
});
