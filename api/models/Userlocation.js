/**
 * Userlocation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: "string",
            required: true
        },
        address: {
            type: 'string'
        },
        pincode: {
            type: 'string'
        },
        state: {
            type: 'string'
        },
        district: {
            type: 'string'
        },
        country: {
            model: 'country'
        },
        user: {
            model: "user"
        }
    },
    addlocation: function (str, callback) {
        Userlocation.create(str).exec(function createCB(error, created) {
            if (error) {
                console.log(error);
                callback("false");
            }
            if (created) {
                callback("true");
            }
        });

    },
    updatelocation: function (str, callback) {
        Userlocation.update({id:str.id},str).exec(function (error, updated) {
            if (error) {
                console.log(error);
                callback("false");
            }
            if (updated) {
                callback("true");
            }
        });
    }
};