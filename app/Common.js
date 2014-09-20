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
    },
    /**
     * Я не знаю как точно и правильно эта функция работает, но она делает именно то, что ожидается, и пока без посторонних эффектов
     * @param store
     * @param url
     * @param [type]
     */
    changeUrlOfProxyInStore: function(store, url, type) {
        var config = store.getProxy().getConfig();
        config.url = url;
        config.type = type || "rest";
        store.setProxy(config);
    }
},null);