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
        abbrevation: {
            type: 'string'
        },
        brand: {
            collection: "brand",
            via: "appliancetype"
        }
    },
    createproduct: function (str, callback) {
        Appliancetype.create(str).exec(function (err, created) {
            if (err) {
                console.log(err);
                callback("false");
            } else {
                console.log(created);
                callback("true");
            }
        });
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