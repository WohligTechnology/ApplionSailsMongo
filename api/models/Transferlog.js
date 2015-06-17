/**
* Transferlog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        userfrom: {
            model: 'user'
        },
        userto: {
            model: 'user'
        },
        appliance: {
            model: 'appliance'
        },
        status: {
            type: "string",
            enum: ['pending','accept','reject']
        }
  }
};

