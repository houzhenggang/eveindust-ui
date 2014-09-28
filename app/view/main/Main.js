/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
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
                text: 'Создание Заказов',
                handler: "onClickCreateOrdersButton"
            },{
                text: "Редактор Торговых Хабов",
                handler: "onClickTradeHubEditorButton"
            },{
                text: "Мониторинг реализации заказов",
                handler: "onClickSalesMonitoringButton"
            },{
                text: "Прибыльность BPO",
                handler: "onClickProfitOfBPOButton"
            }]
        }
    }]
});
