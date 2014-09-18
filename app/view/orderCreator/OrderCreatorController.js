Ext.define('EVEInDust.view.orderCreator.OrderCreatorController', {
    extend: 'Ext.app.ViewController',
    requires: [
        "EVEInDust.model.Order"
    ],
    alias: 'controller.OrderCreator',
    onClickCreateOrderButton: function(){
        var ordersGrid = this.lookupReference("orders-grid"),
            record = new EVEInDust.model.Order(),
            rowEditor = ordersGrid.findPlugin("rowediting"),
            store = ordersGrid.getStore()
        ;
        record.setStatus(Ext.getStore("OrderStatuses").getById(1));
        store.insert(0, [record]);
        rowEditor.startEdit(record,0);
    },
    onEditOrderRowComplete: function(editor, context) {
        var savingMSG = Ext.MessageBox.show({
            msg: 'Сохранение...',
            width:300,
            wait:true,
            waitConfig: {interval:200},
            animateTarget: 'mb7'
        });
        context.record.save({
            success: function(){
                savingMSG.close();
                context.record.commit();
            },
            failure: function(){
                savingMSG.close();
                Ext.Msg.show({
                    title: "Ошибка",
                    msg: "Сохранение записи не удалось",
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    onCancelEditOrderRow: function(editor,context) {
        context.grid.getStore().remove(context.record);
    },
    onClickDeleteOrderButton: function(){
        var deletingMSG = Ext.MessageBox.show({
            msg: 'Удаление заказа...',
            width:300,
            wait:true,
            waitConfig: {interval:200},
            animateTarget: 'mb7'
        });
        this.lookupReference("orders-grid").getSelection()[0].erase({
            success: function(){
                deletingMSG.close();
            },
            failure: function() {
                deletingMSG.close();
                Ext.Msg.show({
                    title: "Ошибка",
                    msg: "Удаление заказа не удалось",
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
    
});
