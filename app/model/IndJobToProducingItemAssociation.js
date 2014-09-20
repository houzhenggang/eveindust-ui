Ext.define("EVEInDust.model.IndJobToProducingItemAssociation", {
    extend: "Ext.data.Model",
    uses: [
        'EVEInDust.model.ItemToProduce'
    ],
    idProperty: "id",
    fields: [
        {
            name: "jobId",
            type: "int"
        },
        {
            name: "id",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "item_to_produce_id",
            type: "int",
            useNull: true
        }
    ],
    validations: [
        {
            type: "presence",
            field: "jobId"
        }
    ],
    associations: [
        {
            type: 'belongsTo',
            name: 'itemToProduce',
            associationKey: 'itemToProduce',
            foreignKey: 'item_to_produce_id',
            instanceName: 'itemToProduce',
            model: 'EVEInDust.model.ItemToProduce',
            getterName: 'getItemToProduce',
            setterName: 'setItemToProduce'
        }
    ],
    proxy: {
        "type": "rest",
        "url": "/api/indjobtoproducingitemassociations",
        "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
        "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
        "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
    }
});
