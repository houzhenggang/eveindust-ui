Ext.define('EVEInDust.view.tradeHubEditor.TradeHubEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TradeHubEditor',
    onClickCreateTradeHubButton: function(){
        var hubsGrid = this.lookupReference("hubs-grid"),
            record = new EVEInDust.model.TradeHub(),
            rowEditor = hubsGrid.findPlugin("rowediting"),
            store = hubsGrid.getStore()
            ;

        store.insert(0, [record]);
        rowEditor.startEdit(record,0);
    },
    onEditRowComplete: function(editor, context) {
        context.record.save({
            success: function(){
                context.record.commit();
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
    onCancelEditRow: function(editor, context){
        if(context.record.phantom) {
            context.grid.getStore().remove(context.record);
        }

    },
    onClickDeleteTradeHubButton: function(){
        var deletingMSG = Ext.MessageBox.show({
            msg: 'Удаление торгового хаба...',
            width:300,
            wait:true,
            waitConfig: {interval:200},
            animateTarget: 'mb7'
        });
        this.lookupReference("hubs-grid").getSelection()[0].erase({
            success: function(){
                deletingMSG.close();
            },
            failure: function() {
                deletingMSG.close();
                Ext.Msg.show({
                    title: "Ошибка",
                    msg: "Удаление торгового хаба не удалось",
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
    
});
