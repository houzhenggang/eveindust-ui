
Ext.define("EVEInDust.view.orderCreator.OrderCreator",{
    extend: "Ext.window.Window",
    requires: [
        'EVEInDust.view.orderCreator.OrderCreatorController',
        'EVEInDust.view.orderCreator.OrderCreatorModel',
        "EVEInDust.model.ItemToProduce",
        "EVEInDust.model.yapeal.CorpIndustryJob"
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
                remoteSort: true,
                remoteFilter: true,
                autoLoad: true
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
                    text: "Закрыть"
                }]
            },
            listeners: {
                itemclick: "OnItemClickInOrdersGrid"
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
            reference: "itemtoproduce-grid",
            store: {
                model: 'EVEInDust.model.ItemToProduce',
                remoteSort: true,
                remoteFilter: true
            },
            plugins: [{
                ptype: 'rowediting',
                clicksToEdit: 2,
                listeners: {
                    edit: 'onEditItemToProduceRowComplete',
                    canceledit: 'onCancelEditItemToProduceRow'
                }
            }],
            tbar: {
                items:[{
                    text: "Создать",
                    handler: "onClickCreateItemToProduceItem"
                },{
                    text: "Удалить",
                    handler: "onClickDeleteItemToProduceItem"
                }]
            },
            columns: [{
                header: "Название",
                dataIndex: "typeId",
                flex: 2,
                renderer: function(typeId, meta, record, rowIndex, colIndex, store, view_) {
                    var invType = this.up('window').getViewModel().getStore('typeId2Name').findRecord("typeId",typeId),
                        typeName = typeId
                    ;
                    // мне приходится так рендерить, потому что хранилище typeId2Name загружается после того, как загружается
                    // хранилище теблицы
                    if(!invType) {
                        setTimeout(function(){ view_.refresh() }, 500);
                    } else {
                        typeName = invType.get("typeName");
                    }


                    return typeName;
                },
                editor: {
                    allowBlank: false
                }
            },{
                header: "План",
                dataIndex: "count",
                flex: 1,
                editor: {
                    allowBlank: false
                }
            },{
                header: "В произв-ве",
                dataIndex: "id",
                flex: 1,
                renderer:function(id, meta, record, rowIndex, colIndex, store, view_) {
                    var countRecord = this.up('window').getViewModel().getStore("itemToProduceCounts").getById(id),
                        result = ""
                    ;

                    if(!countRecord) {
                        setTimeout(function(){ view_.refresh() }, 500);
                    } else {
                        result = countRecord.get("count");
                    }

                    return result;
                }
            }],
            listeners: {
                itemclick: "onItemClickInItemToProduceGrid"
            }
        }]
    },{
        xtype: "grid",
        flex: 1,
        title: "Привязанные работы",
        tbar: {
            items:[{
                text: "Отвязать",
                handler: "onClickDisassociateJobFromProducingItemButton"
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
        flex: 1,
        title: "Непривязанные работы",
        reference: "notAssociatedJobs-grid",
        tbar: {
            items:[{
                text: "Привязать",
                handler: "onClickAssociateJobToProducingItemButton"
            }]
        },
        store: {
            model: 'EVEInDust.model.yapeal.CorpIndustryJob',
            remoteSort: true,
            remoteFilter: true
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true
        }],
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

                // я привязываю хранилище тут, потому что не знаю как привязать его другим способом, если настройки хранилища
                // таблицы указывать прямо в самой таблице...
                this.getDockedItems("pagingtoolbar")[0].bindStore(this.getStore());
            }
        }
    }]
});
