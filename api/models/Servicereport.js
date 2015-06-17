/**
* Servicereport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        calltype: {
            type: "string",
            enum: ['amc','warranty','other']
        },
        agencyname: {
            type: "string"
        },
        serviceengineername: {
            type: "string"
        },
        problemdetail: {
            type: "text"
        },
        servicerender: {
            type: "string"
        },
        callstatus: {
            type: "string",
            enum: ['completed','incomplete','underobservation','amountpaid']
        },
        feedback: {
            type: "text"
        },
        globalrating: {
            type: "string"
        },
        timelyrating: {
            type: "string"
        },
        servicechangesrating: {
            type: "string"
        },
        servicequalityrating: {
            type: "string"
        },
        user: {
            model: "user"
        },
        storeofservicereport: {
            model: "store"
        }

  }
};

