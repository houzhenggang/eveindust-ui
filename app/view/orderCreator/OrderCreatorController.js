Ext.define('EVEInDust.view.orderCreator.OrderCreatorController', {
    extend: 'Ext.app.ViewController',
    requires: [
        "EVEInDust.model.Order",
        "EVEInDust.Common"
    ],
    alias: 'controller.OrderCreator',
    onClickCreateOrderButton: function(){
        var ordersGrid = this.lookupReference("orders-grid"),
            record = new EVEInDust.model.Order()
        ;
        record.setStatus(Ext.getStore("OrderStatuses").getById(1));
        ordersGrid.getStore().insert(0, [record]);
        ordersGrid.findPlugin("rowediting").startEdit(record,0);
    },
    onEditOrderRowComplete: EVEInDust.Common.onEditModelRowComplete(),
    onCancelEditOrderRow: EVEInDust.Common.onCancelEditModelRow,
    onClickDeleteOrderButton: function(){
        EVEInDust.Common.deleteSelectedItemInGrid(this.lookupReference("orders-grid"),"Удаление заказа не удалось");
    },
    OnItemClickInOrdersGrid: function(ordersGrid, order){
        this.lookupReference("itemtoproduce-grid").getStore().addFilter({
            id: "order",
            property: "order",
            value: order.getId()
        });
    },
    onClickCreateItemToProduceItem: function(){
        var itemToProducesGrid = this.lookupReference("itemtoproduce-grid"),
            itemToProduce = new EVEInDust.model.ItemToProduce()
        ;
        itemToProduce.setOrder(this.lookupReference("orders-grid").getSelection()[0]);
        itemToProducesGrid.getStore().insert(0, [itemToProduce]);
        itemToProducesGrid.findPlugin("rowediting").startEdit(itemToProduce,0);
    },
    onClickDeleteItemToProduceItem: function(){
        EVEInDust.Common.deleteSelectedItemInGrid(this.lookupReference("itemtoproduce-grid"),"Удаление товара для производства не удалось");
    },
    onCancelEditItemToProduceRow: EVEInDust.Common.onCancelEditModelRow,
    onEditItemToProduceRowComplete: EVEInDust.Common.onEditModelRowComplete(),
    onItemClickInItemToProduceGrid: function(grid, itemToProduce){
        this.lookupReference("associatedJobs-grid").getStore().addFilter({
            id: "itemToProduce",
            property: "itemToProduce",
            value: itemToProduce.getId()
        });
        this.lookupReference("notAssociatedJobs-grid").getStore().addFilter({
            id: "productTypeId",
            property: "productTypeId",
            value: itemToProduce.get("typeId")
        });
    },
    onClickAssociateJobToProducingItemButton: function (button) {
        var association,
            notAssociatedJobsGrid = this.lookupReference("notAssociatedJobs-grid"),
            me = this
        ;
        button.disable();
        association = new EVEInDust.model.IndJobToProducingItemAssociation();
        association.setItemToProduce(this.lookupReference("itemtoproduce-grid").getSelection()[0]);
        association.set("jobId",notAssociatedJobsGrid.getSelection()[0].get("jobId"));
        
        association.save({
            success: function () {
                notAssociatedJobsGrid.getStore().load();
                me.lookupReference("associatedJobs-grid").getStore().load();
            },
            callback: function () {
                button.enable();
            }
        });
    }
    
});
