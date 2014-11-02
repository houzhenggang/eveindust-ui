Ext.define('EVEInDust.view.salesItemsHistory.SalesItemsHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesItemsHistory',
    onAfterRenderItemsGrid: function(){
        var itemsStore = this.getViewModel().getStore('items'),
            itemsGrid = this.lookupReference('items-grid'),
            itemsGridStore = itemsGrid.getStore();

        itemsGrid.setLoading(true);

        itemsStore.load({
            scope: this,
            callback: function(items) {
                var i, itemsToAdd = [], itemsPerStation = [], stationId, typeId, itemsSecondStage,
                    unitPriceCostsPerTypeId = [], avgSellPricesPerStationPerTypeId = [], avgUnitPriceCostPerTypeId = [], sumPerTypeId,
                    length, sum
                ;

                for(i = 0; i< items.length; i++) {
                    stationId = items[i].get('stationId');
                    typeId = items[i].get('typeId');
                    if(!itemsPerStation[stationId]) {
                        itemsPerStation[stationId] = [];
                    }
                    if(!itemsPerStation[stationId][typeId]) {
                        itemsPerStation[stationId][typeId] = [];
                    }
                    itemsPerStation[stationId][typeId].push(items[i]);

                    if(!unitPriceCostsPerTypeId[typeId]) {
                        unitPriceCostsPerTypeId[typeId] = [];
                    }
                    unitPriceCostsPerTypeId[typeId].push(items[i].get('unitPrimeCost'))
                }

                for(typeId in unitPriceCostsPerTypeId) {
                    if(unitPriceCostsPerTypeId.hasOwnProperty(typeId)) {
                        sumPerTypeId = 0;
                        length = unitPriceCostsPerTypeId[typeId].length;
                        for(i=0;i < length;i++) {
                            sumPerTypeId += unitPriceCostsPerTypeId[typeId][i];
                        }
                        avgUnitPriceCostPerTypeId[typeId] = sumPerTypeId/length;
                    }
                }
                for(stationId in itemsPerStation) {
                    if(itemsPerStation.hasOwnProperty(stationId)) {
                        itemsSecondStage = [];
                        avgSellPricesPerStationPerTypeId = [];
                        for(typeId in itemsPerStation[stationId]){
                            if(itemsPerStation[stationId].hasOwnProperty(typeId)){
                                if(!itemsSecondStage[typeId]) {
                                    itemsSecondStage[typeId] = {
                                        typeId: typeId,
                                        stationId: stationId,
                                        avgUnitPriceCost: avgUnitPriceCostPerTypeId[typeId],
                                        avgSellPrice: 0,
                                        income: 0,
                                        overallExpenses: 0,
                                        soldQuantity: 0
                                    }
                                }
                                if(!avgSellPricesPerStationPerTypeId[typeId]) {
                                    avgSellPricesPerStationPerTypeId[typeId] = [];
                                }
                                length = itemsPerStation[stationId][typeId].length;
                                for(i = 0; i<length;i++ ) {
                                    avgSellPricesPerStationPerTypeId[typeId].push(itemsPerStation[stationId][typeId][i].get('avgSellPrice'));
                                    itemsSecondStage[typeId]["income"] += +itemsPerStation[stationId][typeId][i].get("income");
                                    itemsSecondStage[typeId]["overallExpenses"] += +itemsPerStation[stationId][typeId][i].get("overallExpenses");
                                    itemsSecondStage[typeId]["soldQuantity"] += +itemsPerStation[stationId][typeId][i].get("realCount");
                                }
                            }
                        }

                        for(typeId in itemsSecondStage) {
                            if(itemsSecondStage.hasOwnProperty(typeId)) {
                                length = avgSellPricesPerStationPerTypeId[typeId].length;
                                sum = 0;
                                for(i =0;i<length;i++){
                                    sum += +avgSellPricesPerStationPerTypeId[typeId][i];
                                }
                                itemsSecondStage[typeId]["avgSellPrice"] = sum/length;
                                itemsToAdd.push(itemsSecondStage[typeId]);
                            }

                        }
                    }
                }

                itemsGridStore.add(itemsToAdd);
                itemsGrid.setLoading(false);
            }
        });
    }
});
