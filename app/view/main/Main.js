/**
 * This class is the main view for the application. It is specified in app.js as the
 * 'autoCreateViewport' property. That setting automatically applies the 'viewport'
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EVEInDust.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'EVEInDust.view.main.MainController',
        'EVEInDust.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'fit',
    items: [{
        tbar:{
            items: [{
                text: 'Производство и реализация',
                menu: {
                    items: [{
                        text: 'Формирование заказов',
                        handler: 'onClickCreateOrdersButton'
                    },{
                        text: 'Мониторинг реализации',
                        handler: 'onClickSalesMonitoringButton'
                    },{
                        text: 'История',
                        menu: {
                            items: [{
                                text: 'По заказам',
                                handler: 'onClickSalesHistoryButton'
                            },{
                                text: 'По товарам',
                                handler: 'onClickItemsSalesHistoryButton'
                            }]
                        }
                    }]
                }
            },{
                text: 'Редактор Торговых Хабов',
                handler: 'onClickTradeHubEditorButton'
            },{
                text: 'Прибыльность BPO',
                handler: 'onClickProfitOfBPOButton'
            },{
                text: 'Мониторинг персонажей',
                handler: 'onClickCharactersMonitorButton'
            },{
                text: 'Обзор BPC',
                handler: 'onClickOverviewBPCRuns'
            }]
        }
    }]
});
