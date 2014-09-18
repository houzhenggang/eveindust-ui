Ext.define("EVEInDust.model.OrderStatus", {
    extend: "Ext.data.Model",
    uses: [
    ],
    idProperty: "id",
    fields: [
        {
                name: "name",            
                type: "string"            
        },
        {
                name: "comment",            
                type: "string",            
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
            field: "name"
        },
        {
            type: "presence",
            field: "comment"
        }
    ],
    associations: [
    ],
    proxy: {"type":"rest","url":"/api/orderstatusns","actionMethods":{"update":"PATCH","read":"GET","create":"POST","destroy":"DELETE"},"reader":{"rootProperty":"data","type":"json","messageProperty":"message"},"writer":{"type":"json","writeRecordId":false,"writeAllFields":false,"dateFormat":"Y-m-d\\TH:i:sO"}}
});
