/**
* Componentwarranty.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        component: {
            type: "string",
            required: true
        },
        serial: {
            type: 'string'
        },
        warrantyperiod: {
            type: "integer"
        },
        bill: {
            type: 'string'
        },
        warrantycard: {
            type: 'string'
        },
        appliance: {
            model: "appliance"
        }

  }
};

