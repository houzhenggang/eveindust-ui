Ext.define('EVEInDust.view.salesHistory.SalesHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesHistory',
    onItemClickInOrderGrid: function (grid, order) {
        this.lookupReference("items-grid").getStore().addFilter({
            id: "order",
            property: "order",
            value: order.getId()
        });
    },
    onSelectionChangeInItemsGrid: function (grid, selectedItems) {
    },
    onEditOrderRowComplete: EVEInDust.Common.onEditModelRowComplete()
});
