/**
* Rating.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        user: {
            model: 'user'
        },
        globalrating: {
            type: "string"
        },
        timelyrating: {
            type: "string"
        },
        servicechargesrating: {
            type: "string"
        },
        servicequalityrating: {
            type: "string"
        },
        store: {
            model: "store"
        }

  }
};

