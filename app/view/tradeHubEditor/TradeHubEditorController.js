Ext.define('EVEInDust.view.tradeHubEditor.TradeHubEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TradeHubEditor',
    onClickCreateTradeHubButton: function(){
        this.createForm = this.getView().add({
            xtype: "tradeHubEditor.CreateWindow"
        });

        this.createForm.show();
        //this.createForm.
    },
    onClickSaveHubButton: function() {
        var formPanel = this.createForm.down('form'),
            form = formPanel.getForm();

        if(form.isValid()) {

            var record = this.lookupSession().createRecord(EVEInDust.model.TradeHub);
            form.updateRecord(record);
            console.log(record);

            this.getView().remove(this.createForm);
            this.createForm = null;

        }

    },
    onClickCancelButton: function(){
        this.getView().remove(this.createForm);
        this.createForm = null;
    }
    
});
