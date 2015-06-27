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
        brands: {
            collection: "brand",
            via: "appliancetypes"
        }
    },
    searchproduct: function (str, callback) {
        var check = str.name;
        Appliancetype.find({
                name: {
                    'like': '%' + check + '%'
                }
        }).exec(function findCB(error, found) {
            if (found.length) {
                console.log(found);
                callback(found);
            } else {
                callback("false");
            }
        });
    }
};