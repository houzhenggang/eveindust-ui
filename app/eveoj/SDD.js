Ext.define("EVEInDust.eveoj.SDD",{
    singleton: true,
    SDDInstance: null,
    invTypes: null,
    invTypesStore: null,
    initSSDInstance: function(url, callback){
        var SDD = EVEoj.SDD.Create('json', {'path': url}),
            me = this
        ;

        SDD.LoadMeta()
            .then(function(arg){
                arg.source.GetTable('invTypes').Load().then(function(arg){
                    me.handleInvTypes(arg);
                    callback();
                });
            });
    },
    handleInvTypes: function(arg){
        var i, row,
            table = arg.table
        ;
        this.invTypesStore = Ext.create("Ext.data.Store",{
            storeId: "eveoj.invTypes",
            fields: [
                { name: "typeId", type: "int"},
                { name: "typeName", type: "string"}
            ]
        });
        for(i in table.data) {
            if(table.data.hasOwnProperty(i)) {
                row = table.data[i];
                this.invTypesStore.add({typeId: row[table.c.typeID], typeName: row[table.c.typeName]})
            }
        }

    },
    getInvTypesStore: function(){
        return this.invTypesStore;
    }
},null);