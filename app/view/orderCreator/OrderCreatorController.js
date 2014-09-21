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
    OnItemClickInOrdersGrid: function(ordersGrid, order) {
        var itemToProduceStore = this.lookupReference("itemtoproduce-grid").getStore(),
            afterLoad,
            me = this
        ;
        afterLoad = function (store, itemToProduces) {
            var i,
                filters = []
            ;
            for(i in itemToProduces) {
                if(itemToProduces.hasOwnProperty(i)) {
                    console.log(itemToProduces[i]);
                    filters.push({
                        id: "typeId",
                        property: "typeId",
                        value: itemToProduces[i].get("typeId")
                    })
                }
            }
            me.getViewModel().getStore('itemId2Name').addFilter(filters);
            itemToProduceStore.un('load',afterLoad);

        };
        itemToProduceStore.on('load',afterLoad);
        itemToProduceStore.addFilter({
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
        this.getViewModel().getStore('industry_activity_products').addFilter([{
            id: "productTypeId",
            property: "productTypeId",
            value: itemToProduce.get("typeId")
        },{
            id: "activityId",
            property: "activityId",
            value: EVEInDust.common.IndustryActivity.Manufacturing
        }]);
        this.lookupReference("associatedJobs-grid").getStore().addFilter({
            id: "itemToProduce",
            property: "itemToProduce",
            value: itemToProduce.getId()
        });
        this.lookupReference("notAssociatedJobs-grid").getStore().addFilter([{
            id: "productTypeId",
            property: "productTypeId",
            value: itemToProduce.get("typeId")
        },{
            id: "activityId",
            property: "activityId",
            value: EVEInDust.common.IndustryActivity.Manufacturing
        }]);
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
    },
    onClickDisassociateJobFromProducingItemButton: function(button) {
        var store,
            me = this,
            associatedJobsGrid = this.lookupReference("associatedJobs-grid")
        ;
        button.disable();
        associatedJobsGrid.setLoading(true);

        // Я пока не знаю как загрузить необходимую сущность по-другому... реализовывать аякс запрос мне не очень хочется, так проще...
        store = Ext.create(Ext.data.Store,{
            model: 'EVEInDust.model.IndJobToProducingItemAssociation',
            remoteFilter: true,
            filters: [{
                id: "jobId",
                property: "jobId",
                value: associatedJobsGrid.getSelection()[0].get("jobId")
            }]
        });
        store.load(function (records, operation, success) {
            if(success) {
                records[0].erase({
                    success: function () {
                        associatedJobsGrid.setLoading(false);
                        associatedJobsGrid.getStore().load();
                        me.lookupReference("notAssociatedJobs-grid").getStore().load()
                    },
                    failure: function () {
                        Ext.Msg.show({
                            title: "Ошибка",
                            msg: "Не удалось отвязать работу",
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                        associatedJobsGrid.setLoading(false);
                    },
                    callback: function () {
                        button.enable();
                    }
                });
            } else {
                button.enable();
                associatedJobsGrid.setLoading(false);
                Ext.Msg.show({
                    title: "Ошибка",
                    msg: "Не удалось загрузить данные для отвязывания работы",
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
    
});
