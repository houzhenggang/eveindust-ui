Ext.define('EVEInDust.view.salesMonitoring.SalesMonitoringController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesMonitoring',
    onItemClickInOrderGrid: function (grid, order) {
        this.lookupReference("items-grid").getStore().addFilter({
            id: "order",
            property: "order",
            value: order.getId()
        });
    },
    onSelectionChangeInItemsGrid: function (grid, selectedItems) {
        var markAsSoldButton = this.lookupReference("items-grid").down('button[action="markAsSold"]');
        if (selectedItems.length > 0 && selectedItems[0].get('manualMarkSold') == 0 && selectedItems[0].get("lastTransactionDatetime") === null) {
            markAsSoldButton.enable();
        } else {
            markAsSoldButton.disable();
        }
    },
    onClickMarkItemAsSoldItem: function (button) {
        var selectedItems = this.lookupReference("items-grid").getSelection();

        button.disable();
        if (selectedItems.length > 0) {
            var item = selectedItems[0];
            item.set('manualMarkSold', 1);
            item.save({
                success: function () {
                    item.commit();
                    Ext.Msg.alert(
                        "Предмет был успешно отмечен",
                        "Предмет " + item.getId() + " был успешно помечен, как 'проданный'. Нужно немного подождать перед тем как будет совершен пересчет"
                    );
                },
                failrure: function () {
                    item.reject();
                    Ext.Msg.alert("Ошибка", "Предмет " + item.getId() + " не удалось пометить как 'проданный'");
                    button.enable();
                }
            })
        } else {
            Ext.Msg.alert("Не было выбрано записи для обработки");
        }
    },
    onEditOrderRowComplete: EVEInDust.Common.onEditModelRowComplete()
});
