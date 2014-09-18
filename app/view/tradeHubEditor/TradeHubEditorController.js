Ext.define('EVEInDust.view.tradeHubEditor.TradeHubEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TradeHubEditor',
    onClickCreateTradeHubButton: function(){
        this.createForm = this.getView().add({
            xtype: "tradeHubEditor.CreateWindow"
        });

        this.createForm.show();
    },
    onClickSaveHubButton: function() {
        var formPanel = this.createForm.down('form'),
            form = formPanel.getForm(),
            record,
            me = this
        ;

        if(form.isValid()) {
            record = new EVEInDust.model.TradeHub();
            form.updateRecord(record);
            //record.save({
            //    callback: function(){
                    me.getViewModel().getStore("tradehubToGrid").add(record);
                    me.closeCreateForm();
            //    }
            //});
        }
    },
    onClickCancelButton: function(){
        this.closeCreateForm();
    },
    closeCreateForm: function(){
        this.getView().remove(this.createForm);
        this.createForm = null;
    }
    
});
