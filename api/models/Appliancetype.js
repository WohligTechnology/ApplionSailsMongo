/**
 * Appliancetype.js
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
        icon: {
            type: "string"
        },
        abbreviation: {
            type: 'string'
        },
        brand: {
            collection: "brand",
            via: "appliancetype"
        }
    },
    searchproduct: function (str, callback) {
        var check = str.name;
        console.log('searching');
        Appliancetype.find({
            name: {
                'like': '%' + check + '%'
            }
        }).exec(function findCB(error, found) {
            if (found.length) {
                console.log(found);
                callback(found);
            } else {
                callback({
                    value: "false"
                })
            }
        });
    },
    findallproducts: function (str, callback) {
        Appliancetype.find({}).exec(function (error, data) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (data) {
                console.log(data);
                callback(data);
            }
        });
    }
};