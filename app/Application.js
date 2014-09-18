/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('EVEInDust.Application', {
    extend: 'Ext.app.Application',
    
    name: 'EVEInDust',
    requires: [
        'Ext.grid.Panel'
    ],

    stores: [
        'TradeHubs'
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
