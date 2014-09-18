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
            savingMSG,
            me = this
        ;

        if(form.isValid()) {
            record = new EVEInDust.model.TradeHub();
            form.updateRecord(record);

            savingMSG = Ext.MessageBox.show({
                msg: 'Сохранение...',
                width:300,
                wait:true,
                waitConfig: {interval:200},
                animateTarget: 'mb7'
            });

            record.save({
                success: function(){
                    console.log(me.getViewModel().getStore("tradehubToGrid"));
                    savingMSG.close();
                    me.getViewModel().getStore("tradehubToGrid").add(record);
                    me.closeCreateForm();
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
