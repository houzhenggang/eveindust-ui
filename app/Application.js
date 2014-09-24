Ext.define('EVEInDust.Application', {
    extend: 'Ext.app.Application',
    
    name: 'EVEInDust',
    requires: [
        'Ext.grid.Panel',
        "EVEInDust.eveoj.SDD"
    ],

    stores: [
        'TradeHubs',
        "OrderStatuses"
    ],
    launch: function(){
        EVEInDust.eveoj.SDD.initSSDInstance('http://cf.xyjax.com/sdd/101505',function(){
            var invTypesTable = EVEInDust.eveoj.SDD.getInvTypesTable(),
                i, row,
                data = []
            ;
            console.log(invTypesTable);
            for(i in invTypesTable.data) {
                if(invTypesTable.data.hasOwnProperty(i)) {
                    row = invTypesTable.data[i];
                    if(+row[invTypesTable.c.groupID] === 83) {
                        data.push([row[invTypesTable.c.typeID], row[invTypesTable.c.typeName]]);
                    }
                }
            }
            Ext.create("Ext.data.ArrayStore",{
                fields: [
                    { name: "typeId", type: "int"},
                    { name: "typeName", type: "string"}
                ],
                data: data,
                storeId: "eveoj.InvTypes"
            });
            console.log(Ext.getStore("eveoj.InvTypes"));

        });
    }
});
