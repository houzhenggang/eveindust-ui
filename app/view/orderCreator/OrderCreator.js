
Ext.define("EVEInDust.view.orderCreator.OrderCreator",{
    extend: "Ext.window.Window",
    requires: [
        'EVEInDust.view.orderCreator.OrderCreatorController',
        'EVEInDust.view.orderCreator.OrderCreatorModel',
        "EVEInDust.model.Item",
        "EVEInDust.model.yapeal.CorpIndustryJob",
        "EVEInDust.common.OrderStatuses"
    ],
    title: "Формирование заказа",
    xtype: "OrderCreator",
    controller: "OrderCreator",
    viewModel: {
        type: "OrderCreator"
    },
    width: 700,
    height: 650,
    closable: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },
    items: [{
        xtype: "panel",
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: "grid",
            title: "Заказы",
            reference: "orders-grid",
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 2,
                listeners: {
                    edit: 'onEditOrderRowComplete',
                    canceledit: 'onCancelEditOrderRow'
                }
            }],
            store: {
                model: 'EVEInDust.model.Order',
                remoteFilter: true,
                pageSize: 0,
                autoLoad: true,
                filters: [{
                    id: "status",
                    property: "status",
                    value: EVEInDust.common.OrderStatuses.Forming
                }]
            },
            flex: 1,
            tbar: {
                items: [{
                    text: "Создать",
                    handler: "onClickCreateOrderButton"
                },{
                    text: "Удалить",
                    handler: "onClickDeleteOrderButton"
                },{
                    text: "Закрыть",
                    handler: "onClickCloseOrderButton"
                }]
            },
            listeners: {
                itemclick: "onItemClickInOrdersGrid",
                selectionchange: "onSelectionChangeInOrdersGrid"
            },
            columns: [{
                header: "#",
                flex: 25/100,
                dataIndex: "id"
            },{
                header: "Торговый хаб",
                flex: 1,
                dataIndex: "stationId",
                renderer: function(value){
                    var record = Ext.getStore("TradeHubs").findRecord("stationId",value);

                    if(record) {
                        return record.get("name");
                    } else {
                        return value;
                    }
                },
                editor: {
                    xtype: "combo",
                    allowBlank: false,
                    queryMode: 'local',
                    bind: {
                        store: "{hubs}"
                    },
                    displayField: 'name',
                    valueField: 'stationId',
                    forceSelection: true,
                    typeAhead: true
                }
            }]
        },{
            xtype: "grid",
            title: "Предметы для произв-ва",
            flex: 2,
            hidden: true,
            reference: "items-grid",
            store: {
                model: 'EVEInDust.model.Item',
                remoteFilter: true,
                pageSize: 0
            },
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 2,
                listeners: {
                    edit: 'onEditItemRowComplete',
                    canceledit: 'onCancelEditItemRow'
                }
            }],
            tbar: {
                items:[{
                    text: "Создать",
                    handler: "onClickCreateItem"
                },{
                    text: "Удалить",
                    handler: "onClickDeleteItemItem"
                },{
                    iconCls: "x-tbar-loading",
                    handler: function(button){
                        button.up("grid").getStore().load();
                    }
                }]
            },
            columns: [{
                header: "Название",
                dataIndex: "typeId",
                flex: 2,
                renderer: function(typeId) {
                    var record = Ext.getStore("eveoj.InvTypes").findRecord("typeId",typeId);
                    if(record) {
                        return record.get("typeName");
                    } else {
                        return typeId;
                    }
                },
                editor: {
                    xtype: "combo",
                    queryMode: 'local',
                    store: "eveoj.InvTypes",
                    displayField: 'typeName',
                    valueField: 'typeId',
                    forceSelection: true,
                    typeAhead: true,
                    hideTrigger: true
                }
            },{
                header: "План",
                dataIndex: "count",
                flex: 1/2,
                editor: {
                    allowBlank: false
                }
            },{
                header: "В произв-ве",
                dataIndex: "realCount",
                flex: 1/2
            }],
            listeners: {
                itemclick: "onItemClickInItemGrid",
                selectionchange: "onSelectionChangeInItemsGrid"
            }
        }]
    },{
        xtype: "panel",
        flex: 1,
        layout: {
            type: "hbox",
            align: "stretch"
        },
        items: [{
            xtype: "grid",
            flex: 1,
            title: "Привязанные работы",
            hidden: true,
            tbar: {
                items:[{
                    text: "Отвязать",
                    handler: "onClickDisassociateJobFromProducingItemButton"
                },{
                    iconCls: "x-tbar-loading",
                    handler: function(button){
                        button.up("grid").getStore().load();
                    }
                }]
            },
            reference: "associatedJobs-grid",
            store: {
                model: 'EVEInDust.model.yapeal.CorpIndustryJob',
                remoteSort: true,
                remoteFilter: true
            },
            columns: [{
                header: "Дата окончания",
                xtype: "datecolumn",
                format: "Y-m-d H:i:s",
                dataIndex: "endDate",
                flex: 1
            },{
                header: "Кол-во",
                dataIndex: "runs",
                flex: 1,
                renderer: function(runsCount, meta, record, rowIndex, colIndex, store, view) {
                    var indActivityRecord = this.up('window').getViewModel().getStore('industry_activity_products').findRecord("productTypeId",record.get("productTypeId")),
                        result = runsCount
                        ;

                    if(!indActivityRecord) {
                        setTimeout(function(){ view.refresh() }, 500);
                    } else {
                        result = indActivityRecord.get("quantity")*runsCount;
                    }

                    return result;
                }
            },{
                header: "Цена",
                dataIndex: "cost",
                flex: 1
            }],
            listeners: {
                afterrender: function(grid) {
                    EVEInDust.Common.changeUrlOfProxyInStore(grid.getStore(),"/api/yapeal/associatedcorpindustryjobs");
                }
            }
        },{
            xtype: "grid",
            title: "План",
            flex: 1,
            hidden:true,
            reference: "plannedJobs-grid",
            store: {
                model: "EVEInDust.model.PlannedJob",
                remoteFilter: true,
                pageSize: 0
            },
            tbar: {
                items: [{
                    text: "Создать",
                    handler: "onClickCreatePlannedJobButton"
                },{
                    text: "Удалить"
                },{
                    iconCls: "x-tbar-loading",
                    handler: function(button){
                        button.up("grid").getStore().load();
                    }
                }]
            },
            columns: [{
                header: "Кол-во",
                flex: 1,
                dataIndex: "runs"
            },{
                header: "ME коэффициент",
                flex: 1,
                dataIndex: "facilityMeBonus",
                xtype: "numbercolumn",
                format: "0,000.00"
            }]
        }]
    },{
        xtype: "grid",
        flex: 1,
        title: "Непривязанные работы",
        hidden: true,
        reference: "notAssociatedJobs-grid",
        tbar: {
            items:[{
                text: "Привязать",
                handler: "onClickAssociateJobToProducingItemButton"
            },{
                iconCls: "x-tbar-loading",
                handler: function(button){
                    button.up("grid").getStore().load();
                }
            }]
        },
        selModel: {
            mode: "MULTI"
        },
        store: {
            model: 'EVEInDust.model.yapeal.CorpIndustryJob',
            remoteFilter: true,
            pageSize: 0
        },
        columns: [{
            header: "Дата окончания",
            xtype: "datecolumn",
            format: "Y-m-d H:i:s",
            dataIndex: "endDate",
            flex: 1
        },{
            header: "Кол-во",
            dataIndex: "runs",
            flex: 1,
            renderer: function(runsCount, meta, record, rowIndex, colIndex, store, view) {
                var indActivityRecord = this.up('window').getViewModel().getStore('industry_activity_products').findRecord("productTypeId",record.get("productTypeId")),
                    result = runsCount
                    ;

                if(!indActivityRecord) {
                    setTimeout(function(){ view.refresh() }, 500);
                } else {
                    result = indActivityRecord.get("quantity")*runsCount;
                }

                return result;
            }
        },{
            header: "Цена",
            dataIndex: "cost",
            flex: 1
        }],
        listeners: {
            afterrender: function(grid) {
                EVEInDust.Common.changeUrlOfProxyInStore(grid.getStore(),"/api/yapeal/notassociatedcorpindustryjobs");
            }
        }
    }]
});
