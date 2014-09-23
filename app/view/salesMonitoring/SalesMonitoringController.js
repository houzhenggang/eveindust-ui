Ext.define('EVEInDust.view.salesMonitoring.SalesMonitoringController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesMonitoring',
    onItemClickInOrderGrid: function(grid, order){
        this.lookupReference("itemsToProduce-grid").getStore().addFilter({
            id: "order",
            property: "order",
            value: order.getId()
        });
    }
    
});
