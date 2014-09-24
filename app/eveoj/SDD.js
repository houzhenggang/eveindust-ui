Ext.define("EVEInDust.eveoj.SDD",{
    singleton: true,
    SDDInstance: null,
    invTypesTable: null,
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
        this.invTypesTable = arg.table;
    },
    getInvTypesTable: function(){
        return this.invTypesTable;
    }
},null);