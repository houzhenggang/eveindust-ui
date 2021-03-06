Ext.define("EVEInDust.model.Item", {
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
            name: "realCount",
            type: "int"
        },
        {
            name: "manualMarkSold",
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
        }, {
            name: "lastTransactionDatetime",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO",
            useNull: true
        }, {
            // Сделал данное поле, чтобы не городить постоянно эти проверки. Необходимо обратить внимание, что
            // данные поля (remainsQuantity) генерируются в самом контроллере ItemController.
            name: "isSoldOut",
            calculate: function (rawdata) {
                return rawdata["remainsQuantity"] <= 0 || +rawdata["manualMarkSold"] === 1;
            }
        }
    ],
    validations: [
        {
            type: "presence",
            field: "typeId"
        },
        {
            type: "presence",
            field: "realCount"
        },
        {
            type: "presence",
            field: "manualMarkSold"
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
    proxy: {
        "type": "rest",
        "url": "/api/itemtoproduces",
        "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
        "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
        "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
    }
});
