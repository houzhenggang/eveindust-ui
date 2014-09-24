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
            console.log("eveoj is ready")
        });
    }
});
