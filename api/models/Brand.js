/**
 * Brand.js
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
        abbreviation: {
            type: 'string'
        },
        image: {
            type: "string"
        },
        status: {
            type: 'string',
            enum: ['IsPublished for User', 'Not Published for User']
        },
        appliancetypes: {
            collection: "appliancetype",
            via: "brands"
        }

    },
    findbrand: function (str, callback) {
        var returns = [];
        var exit = 0;
        var exitup = 0;
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (db) {
                exit++;
                db.collection('brand').find({
                    appliancetype: str.appliancetype
                }).toArray(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback({
                            value: "false"
                        });
                    }
                    if (data != null) {
                        exitup++;
                        if (exit == exitup) {
                            console.log(data);
                            callback(data);
                        }
                    } else {
                        if (exit != exitup) {
                            callback({
                                value: "false"
                            });
                        }
                    }
                });
            }
        });
    },

    searchbrand: function (str, callback) {
        var check = str.name;
        console.log('searching');
        Brand.find({
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