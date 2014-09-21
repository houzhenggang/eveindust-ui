Ext.define("EVEInDust.model.yapeal.CorpIndustryJob", {
    extend: "Ext.data.Model",
    uses: [],
    idProperty: "jobId",
    fields: [
        {
            name: "activityId",
            type: "boolean"
        },
        {
            name: "blueprintId",
            type: "int"
        },
        {
            name: "blueprintLocationId",
            type: "int"
        },
        {
            name: "blueprintTypeId",
            type: "int"
        },
        {
            name: "blueprintTypeName",
            type: "string"
        },
        {
            name: "completedCharacterId",
            type: "int"
        },
        {
            name: "completedDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO"
        },
        {
            name: "cost",
            type: "float"
        },
        {
            name: "endDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO"
        },
        {
            name: "facilityId",
            type: "int"
        },
        {
            name: "installerId",
            type: "int"
        },
        {
            name: "installerName",
            type: "string",
            useNull: true
        },
        {
            name: "licensedRuns",
            type: "int"
        },
        {
            name: "outputLocationId",
            type: "int"
        },
        {
            name: "pauseDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO"
        },
        {
            name: "probability",
            type: "string",
            useNull: true
        },
        {
            name: "productTypeId",
            type: "int"
        },
        {
            name: "productTypeName",
            type: "string"
        },
        {
            name: "runs",
            type: "int"
        },
        {
            name: "solarSystemId",
            type: "int"
        },
        {
            name: "solarSystemName",
            type: "string"
        },
        {
            name: "startDate",
            type: "date",
            dateFormat: "Y-m-d\\TH:i:sO"
        },
        {
            name: "stationId",
            type: "int"
        },
        {
            name: "status",
            type: "int"
        },
        {
            name: "teamId",
            type: "int"
        },
        {
            name: "timeInSeconds",
            type: "int"
        },
        {
            name: "ownerId",
            type: "int",
            useNull: true,
            persist: false
        },
        {
            name: "jobId",
            type: "int",
            useNull: true,
            persist: false
        }
    ],
    validations: [
        {
            type: "presence",
            field: "activityId"
        },
        {
            type: "presence",
            field: "blueprintId"
        },
        {
            type: "presence",
            field: "blueprintLocationId"
        },
        {
            type: "presence",
            field: "blueprintTypeId"
        },
        {
            type: "presence",
            field: "blueprintTypeName"
        },
        {
            type: "presence",
            field: "completedCharacterId"
        },
        {
            type: "presence",
            field: "completedDate"
        },
        {
            type: "presence",
            field: "cost"
        },
        {
            type: "presence",
            field: "endDate"
        },
        {
            type: "presence",
            field: "facilityId"
        },
        {
            type: "presence",
            field: "installerId"
        },
        {
            type: "presence",
            field: "installerName"
        },
        {
            type: "presence",
            field: "licensedRuns"
        },
        {
            type: "presence",
            field: "outputLocationId"
        },
        {
            type: "presence",
            field: "pauseDate"
        },
        {
            type: "presence",
            field: "probability"
        },
        {
            type: "presence",
            field: "productTypeId"
        },
        {
            type: "presence",
            field: "productTypeName"
        },
        {
            type: "presence",
            field: "runs"
        },
        {
            type: "presence",
            field: "solarSystemId"
        },
        {
            type: "presence",
            field: "solarSystemName"
        },
        {
            type: "presence",
            field: "startDate"
        },
        {
            type: "presence",
            field: "stationId"
        },
        {
            type: "presence",
            field: "status"
        },
        {
            type: "presence",
            field: "teamId"
        },
        {
            type: "presence",
            field: "timeInSeconds"
        }
    ],
    associations: [],
    proxy: {
        "type": "rest",
        "url": "/api/yapeal/corpindustryjobs",
        "actionMethods": {"update": "PATCH", "read": "GET", "create": "POST", "destroy": "DELETE"},
        "reader": {"rootProperty": "data", "type": "json", "messageProperty": "message"},
        "writer": {"type": "json", "writeRecordId": false, "writeAllFields": false, "dateFormat": "Y-m-d\\TH:i:sO"}
    }
});
