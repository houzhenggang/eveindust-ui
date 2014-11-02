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
        },
        {
            name: "readyDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO",
            useNull: true
        },
        {
            name: "startSellingDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO",
            useNull: true
        },
        {
            name: "endSellingDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO",
            useNull: true
        },
        {
            name: "totalProfit",
            type: "number",
            calculate: function(order) {
                return +order["totalIncome"]-(+order["overallExpenses"]);
            }
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
        },
        {
            type: "presence",
            field: "readyDate"
        },
        {
            type: "presence",
            field: "startSellingDate"
        },
        {
            type: "presence",
            field: "endSellingDate"
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
