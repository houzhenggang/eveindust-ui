Ext.define("EVEInDust.Common",{
    singleton: true,
    onEditModelRowComplete: function(failureMessage, failureTitle) {
        failureMessage = failureMessage || "Сохранение записи не удалось";
        failureTitle = failureTitle || "Ошибка";
        return function(editor, context) {
            context.record.save({
                success: function(){
                    context.record.commit();
                },
                failure: function(){
                    Ext.Msg.show({
                        title: failureTitle,
                        msg: failureMessage,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
    onCancelEditModelRow: function(editor,context) {
        if(context.record.phantom) {
            context.grid.getStore().remove(context.record);
        }
    },
    deleteSelectedItemInGrid: function(grid, failureMessage, failureTitle) {
        failureMessage = failureMessage || "Удаление заказа не удалось";
        failureTitle = failureTitle || "Ошибка";
        var selectedRows = grid.getSelection();
        if(selectedRows.length > 0) {
            selectedRows[0].erase({
                success: function(){
                },
                failure: function() {
                    Ext.Msg.show({
                        title: failureTitle,
                        msg: failureMessage,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    }
},null);