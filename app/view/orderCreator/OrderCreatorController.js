Ext.define('EVEInDust.view.orderCreator.OrderCreatorController', {
    extend: 'Ext.app.ViewController',
    requires: [
        "EVEInDust.model.Order",
        "EVEInDust.Common",
        "EVEInDust.view.orderCreator.CreatePlannedJobForm",
        "EVEInDust.model.yapeal.CorpBlueprint",
        "EVEInDust.model.sde.IndustryActivityProduct"
    ],
    alias: 'controller.OrderCreator',
    onClickCreateOrderButton: function(){
        var ordersGrid = this.lookupReference("orders-grid"),
            order = new EVEInDust.model.Order()
        ;
        order.setStatus(Ext.getStore("OrderStatuses").getById(1));
        ordersGrid.getSelectionModel().deselectAll();
        ordersGrid.getStore().insert(0, [order]);
        ordersGrid.findPlugin("rowediting").startEdit(order,0);
    },
    onClickCloseOrderButton: function(){
        var ordersGrid = this.lookupReference('orders-grid'),
            order = ordersGrid.getSelection()[0]
            ;

        this.lookupReference("items-grid").hide();
        this.lookupReference("associatedJobs-grid").hide();
        this.lookupReference("notAssociatedJobs-grid").hide();
        this.lookupReference("plannedJobs-grid").hide();

        ordersGrid.setLoading(true);
        order.setStatus(Ext.getStore("OrderStatuses").getById(EVEInDust.common.OrderStatuses.WaitingForProduce));
        order.save({
            success: function(){
                ordersGrid.getStore().load();
            },
            failure: function(){
                order.reject();
            },
            callback: function(){
                ordersGrid.setLoading(false);
            }
        })
    },
    onEditOrderRowComplete: EVEInDust.Common.onEditModelRowComplete(),
    onCancelEditOrderRow: EVEInDust.Common.onCancelEditModelRow,
    onClickDeleteOrderButton: function(){
        EVEInDust.Common.deleteSelectedItemInGrid(this.lookupReference("orders-grid"),"Удаление заказа не удалось");
    },
    onItemClickInOrdersGrid: function(ordersGrid, order) {
        var itemsGrid = this.lookupReference("items-grid"),
            loadAnotherOrderData = true,
            filters, orderIdOfLoadingStore
        ;

        // показываем таблицу с предметами принеобходимости
        if(itemsGrid.isHidden()){
            itemsGrid.show();
        }

        // проверяем не задан ли тот же фильтр, что хотим задать мы. Т.о. предотвращаем повторную загрузку одних и
        // тех же данных
        filters = itemsGrid.getStore().getFilters();
        if(filters.count() > 0 && filters.containsKey("order") && filters.get("order").getValue() === order.getId()) {
            loadAnotherOrderData = false;
        }

        if(loadAnotherOrderData) {
            if(itemsGrid.getStore().isLoading()) {
                orderIdOfLoadingStore = filters.get("order").getValue();
                Ext.Msg.alert("Не торопитесь","Дождитесь загрузки заказа #"+orderIdOfLoadingStore+" прежде чем загружать заказ #"+order.getId());
                ordersGrid.getSelectionModel().select(ordersGrid.getStore().getById(orderIdOfLoadingStore))
            } else {
                // т.к. в таблицу с предметами будут загружаться новые данные, то в связи с этим необходимо
                // спрятать таблицы с работами
                this.lookupReference("associatedJobs-grid").hide();
                this.lookupReference("notAssociatedJobs-grid").hide();
                this.lookupReference("plannedJobs-grid").hide();

                itemsGrid.getStore().addFilter({
                    id: "order",
                    property: "order",
                    value: order.getId()
                });
            }
        }
    },
    onSelectionChangeInOrdersGrid: function(ordersGrid, selectedItems){
        if(selectedItems.length === 0) {
            this.lookupReference("items-grid").hide();
            this.lookupReference("associatedJobs-grid").hide();
            this.lookupReference("notAssociatedJobs-grid").hide();
            this.lookupReference("plannedJobs-grid").hide();

            this.lookupReference('orders-grid').down('button[action="remove"]').disable();
            this.lookupReference('orders-grid').down('button[action="close"]').disable();
        } else {
            this.lookupReference('orders-grid').down('button[action="remove"]').enable();
            this.lookupReference('orders-grid').down('button[action="close"]').enable();
        }
    },
    onClickCreateItem: function(){
        var itemsGrid = this.lookupReference("items-grid"),
            item = new EVEInDust.model.Item()
        ;
        item.setOrder(this.lookupReference("orders-grid").getSelection()[0]);
        itemsGrid.getSelectionModel().deselectAll();
        itemsGrid.getStore().insert(0, [item]);
        itemsGrid.findPlugin("rowediting").startEdit(item,0);
    },
    onClickDeleteItemItem: function(){
        EVEInDust.Common.deleteSelectedItemInGrid(this.lookupReference("items-grid"),"Удаление товара для производства не удалось");
    },
    onCancelEditItemRow: EVEInDust.Common.onCancelEditModelRow,
    onEditItemRowComplete: function(editor, context){
        var clickOnItemAfterSave = false,
            itemsGrid = this.lookupReference("items-grid"),
            record = context.record
        ;
        if(record.phantom) {
            clickOnItemAfterSave = true;
        }
        record.save({
            success: function(){
                record.commit();
                if(clickOnItemAfterSave) {
                    itemsGrid.fireEvent("itemclick",itemsGrid,record);
                }
            },
            failure: function(){
                Ext.Msg.show({
                    title: "Ошибка",
                    msg: "Сохранение записи не удалось",
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    onItemClickInItemGrid: function(itemsGrid, item){
        var associatedJobsGrid = this.lookupReference("associatedJobs-grid"),
            notAssociatedJobsGrid = this.lookupReference("notAssociatedJobs-grid"),
            plannedJobsGrid = this.lookupReference("plannedJobs-grid"),
            associatedJobsStoreFilters = associatedJobsGrid.getStore().getFilters(),
            isAssociatedJobsStoreNecessaryLoading = true,
            notAssociatedJobsStoreFilters = notAssociatedJobsGrid.getStore().getFilters(),
            isNotAssociatedJobsStoreNecessaryLoading = true,
            plannedJobsStoreFilters = plannedJobsGrid.getStore().getFilters(),
            isPlannedJobsStoreNecessaryLoading = true,
            itemIdOfLoadingAssociatedJobs,
            industryActivitiesStoreCallback,
            industryActivityProductsStore = this.getViewModel().getStore('industry_activity_products')
        ;
        if(item.phantom) {
            Ext.Msg.alert("Не торопитесь","Простите, но данная запись ещё не занесена в база, надо немного подождать, чтобы начать с ней работать");
            return;
        }
        if(associatedJobsGrid.isHidden()){
            associatedJobsGrid.show();
        }
        if(notAssociatedJobsGrid.isHidden()) {
            notAssociatedJobsGrid.show();
        }
        if(plannedJobsGrid.isHidden()) {
            plannedJobsGrid.show();
        }

        if(
            associatedJobsStoreFilters.count() > 0 &&
                associatedJobsStoreFilters.containsKey("item") &&
                associatedJobsStoreFilters.get("item").getValue() === item.getId()
            ) {
            isAssociatedJobsStoreNecessaryLoading = false;
        }
        if(
            notAssociatedJobsStoreFilters.count() > 0 &&
                notAssociatedJobsStoreFilters.containsKey("productTypeId") &&
                notAssociatedJobsStoreFilters.get("productTypeId").getValue() === item.get("typeId")
            ) {
            isNotAssociatedJobsStoreNecessaryLoading = false;
        }
        if(
            plannedJobsStoreFilters.count() > 0 &&
                plannedJobsStoreFilters.containsKey("item") &&
                plannedJobsStoreFilters.get("item").getValue() === item.getId()
            ) {
            isPlannedJobsStoreNecessaryLoading = false;
        }


        if( isAssociatedJobsStoreNecessaryLoading || isNotAssociatedJobsStoreNecessaryLoading || isPlannedJobsStoreNecessaryLoading ) {
            if(associatedJobsGrid.getStore().isLoading() || notAssociatedJobsGrid.getStore().isLoading() || plannedJobsGrid.getStore().isLoading()) {
                itemIdOfLoadingAssociatedJobs = associatedJobsStoreFilters.get("item").getValue();
                Ext.Msg.alert("Не торопитесь","Дождитесь загрузки данных о предмете #"+itemIdOfLoadingAssociatedJobs+" прежде чем загружать данные о #"+item.getId());
                itemsGrid.getSelectionModel().select(itemsGrid.getStore().getById(itemIdOfLoadingAssociatedJobs))
            } else {
                if(isAssociatedJobsStoreNecessaryLoading) {
                    associatedJobsGrid.getStore().addFilter({
                        id: "item",
                        property: "item",
                        value: item.getId()
                    });
                }

                if(isPlannedJobsStoreNecessaryLoading) {
                    plannedJobsGrid.getStore().addFilter([{
                        id: "item",
                        property: "item",
                        value: item.getId()
                    }]);
                }

                if(isNotAssociatedJobsStoreNecessaryLoading) {
                    notAssociatedJobsGrid.setLoading(true);
                    industryActivitiesStoreCallback = function(store, records){
                        notAssociatedJobsGrid.setLoading(false);
                        industryActivityProductsStore.un("load",industryActivitiesStoreCallback);
                        notAssociatedJobsGrid.getStore().addFilter([{
                            id: "blueprintTypeId",
                            property: "blueprintTypeId",
                            value: records[0].get("typeId")
                        },{
                            id: "activityId",
                            property: "activityId",
                            value: EVEInDust.common.IndustryActivity.Manufacturing
                        }]);
                    };
                    industryActivityProductsStore.on("load",industryActivitiesStoreCallback)
                }

                industryActivityProductsStore.addFilter([{
                    id: "productTypeId",
                    property: "productTypeId",
                    value: item.get("typeId")
                },{
                    id: "activityId",
                    property: "activityId",
                    value: EVEInDust.common.IndustryActivity.Manufacturing
                }]);
            }
        }
    },
    onSelectionChangeInItemsGrid: function(itemsGrid, selectedItems) {
        if(selectedItems.length === 0) {
            this.lookupReference("associatedJobs-grid").hide();
            this.lookupReference("notAssociatedJobs-grid").hide();
            this.lookupReference("plannedJobs-grid").hide();

            this.lookupReference("items-grid").down('button[action="remove"]').disable();
        } else {
            this.lookupReference("items-grid").down('button[action="remove"]').enable();
        }
    },
    onClickAssociateJobToProducingItemButton: function (button) {
        var i, selectedJobs,
            jobIds = [],
            item = this.lookupReference("items-grid").getSelection()[0],
            notAssociatedJobsGrid = this.lookupReference("notAssociatedJobs-grid"),
            me = this
        ;
        button.disable();
        selectedJobs = notAssociatedJobsGrid.getSelection();
        for(i = 0; i < selectedJobs.length;i++) {
            jobIds.push(selectedJobs[i].get("jobId"));
        }

        this.saveAnyAmountOfAssociatedJobs(item,jobIds,function(){
            notAssociatedJobsGrid.getStore().load();
            me.lookupReference("associatedJobs-grid").getStore().load();
            button.enable();
        });
    },
    /**
     *
     * @param item
     * @param jobIds
     * @param callback
     */
    saveAnyAmountOfAssociatedJobs: function(item, jobIds, callback){
        var progress, saver;

        if(jobIds.length > 0) {
            progress = Ext.Msg.show({
                title: "Привязывание работ",
                message: "Привязывание работы #"+jobIds[0],
                progressText: "1 из "+jobIds.length,
                progress: true,
                closable: false,
                modal: true
            });
            saver = function saver(jobIdIndex){
                var association;
                if(jobIdIndex < jobIds.length) {
                    association = new EVEInDust.model.IndJobToProducingItemAssociation();
                    association.setItem(item);
                    association.set("jobId",jobIds[jobIdIndex]);

                    var indexForHumans = (jobIdIndex+1);
                    progress.updateProgress(indexForHumans/jobIds.length,indexForHumans+" из "+jobIds.length,"Привязывание работы #"+jobIds[jobIdIndex]);

                    association.save({
                        success: function () {
                            saver(jobIdIndex+1);
                        },
                        failure: function(){
                            progress.close();
                            Ext.Msg.show({
                                title: "Ошибка",
                                msg: "Не удалось связать все работы. Проблема с работой #"+jobIds[jobIdIndex],
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                            callback();
                        }
                    });
                } else {
                    progress.close();
                    callback();
                }
            };
            saver(0);
        } else {
            callback();
        }

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
    },
    onClickCreatePlannedJobButton: function(){
        var win = Ext.create("EVEInDust.view.orderCreator.CreatePlannedJobForm"),
            comboBoxInForm, storeWithBPCs, blueprintTypeId
        ;

        this.getView().add(win);
        comboBoxInForm = this.lookupReference("createPlannedJobForm_bpccombo");
        comboBoxInForm.disable();

        blueprintTypeId = this.getViewModel().getStore('industry_activity_products').find("productTypeId",this.lookupReference("items-grid").getSelection()[0].get("typeId"));
        storeWithBPCs = Ext.create("Ext.data.Store",{
            model: "EVEInDust.model.yapeal.CorpBlueprint",
            remoteFilter: true,
            pageSize: 0,
            filters: [{
                id:"runs",
                property: "runs",
                value: "-1",
                operator: "!="
            },{
                id: "typeId",
                property: "typeId",
                value: blueprintTypeId
            }]
        });
        comboBoxInForm.setStore(storeWithBPCs);
        comboBoxInForm.enable();
        win.show();
    },
    onClickSavePlannedJob: function(){
        var formCmp = this.lookupReference("createPlannedJobForm"),
            form = formCmp.getForm(),
            plannedJob
        ;
        if (form.isValid()) {
            if(formCmp.getRecord()) {

            } else {
                plannedJob = Ext.create("EVEInDust.model.PlannedJob");
                formCmp.updateRecord(plannedJob);
                plannedJob.set("item_id",this.lookupReference("items-grid").getSelection()[0].getId());
                plannedJob.save({
                    callback: function(records, operaion, isSuccess){
                        if(isSuccess)
                            console.log("success");
                        else
                            console.log("failure");
                    }
                });
            }
        }
    },
    onSelectionChangeInAssociatedJobsGrid: function(associatedJobsGrid, selectedItems) {
        if(selectedItems.length === 0) {
            this.lookupReference("associatedJobs-grid").down('button[action="unlink"]').disable();
        } else {
            this.lookupReference("associatedJobs-grid").down('button[action="unlink"]').enable();
        }
    },
    onSelectionChangeInNotAssociatedJobsGrid: function(associatedJobsGrid, selectedItems) {
        if(selectedItems.length === 0) {
            this.lookupReference("notAssociatedJobs-grid").down('button[action="link"]').disable();
        } else {
            this.lookupReference("notAssociatedJobs-grid").down('button[action="link"]').enable();
        }
    }
});
