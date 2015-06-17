/**
* Callrating.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        spokentoname: {
            type: "string"
        },
        discussion: {
            type: "text"
        },
        rating: {
            type: "string"
        },
        storeofcallrating: {
            model: "store"
        }

  }
};

