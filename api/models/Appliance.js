/**
 * Appliance.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        appliancetype: {
            model: 'appliancetype'
        },
        brand: {
            model: 'brand'
        },
        user: {
            model: "user"
        },
        name: {
            type: "string",
            required: true
        },
        modelnumber: {
            type: "string"
        },
        serialnumber: {
            type: "string"
        },
        location: {
            type: "string"
        },
        purchaseprice: {
            type: "string"
        },
        billimage: {
            type: 'array'
        },
        store: {
            model: 'store'
        },
        status: {
            type: 'string',
            enum: ['archive', 'delete', 'transfer', 'normal']
        },
        warranty: {
            collection: "warranty",
            via: "appliance"
        },
        componentwarranty: {
            collection: "componentwarranty",
            via: "appliance"
        },
        userlocation: {
            model: "userlocation"
        }
    },
    searchdata: function (str, callback) {
        var check = str.search;
        console.log(check);
        var pageno = 1;
        var limit = 10;
        if (str.page) {
            pageno = str.page;
        }
        if (str.limit) {
            limit = str.limit;
        }
        var limit = str.limit;
        Appliance.find({
            or: [{
                appliancetype: {
                    'like': '%' + check + '%'
                }
            }, {
                brand: {
                    'like': '%' + check + '%'
                }
            }, {
                user: {
                    'like': '%' + check + '%'
                }
            }, {
                name: {
                    'like': '%' + check + '%'
                }
            }, {
                modelnumber: {
                    'like': '%' + check + '%'
                }
            }, {
                serialnumber: {
                    'like': '%' + check + '%'
                }
            }, {
                location: {
                    'like': '%' + check + '%'
                }
            }, {
                purchaseprice: {
                    'like': '%' + check + '%'
                }
            }, {
                store: {
                    'like': '%' + check + '%'
                }
            }]
        }).paginate({
            page: pageno,
            limit: limit
        }).populate("store").populate("user").populate("brand").exec(function findCB(error, found) {
            if (found.length) {
                console.log("found");
                console.log(found);
                callback(found);
            } else {
                callback("false");
            }
        });
    },
    updateappliance: function (str, callback) {
        var returns = [];
        sails.MongoClient.connect(sails.url, function (err, db) {
            var appbrand = db.collection('appliance').update({
                _id: sails.ObjectID(str.id)
            }, {
                $set: str
            }, function (err, updated) {
                if (updated) {
                    returns.push(updated);
                    callback("true");
                }
            });
        });
    },
    createappliance: function (str, callback) {
        var returns = [];
        var storedata = {};
        console.log("in function");
        sails.MongoClient.connect(sails.url, function (err, db) {
            var appbrand = db.collection('appliance').insert(str, function (err, created) {
                if (created) {
                    console.log(str);
                    console.log("in if");
                    var createst = db.collection('store').insert(storedata, function (err, createdst) {
                        if (createdst) {
                            console.log(createdst.ops[0]._id);
                            console.log(created.ops[0]._id);
                            var appbrand1 = db.collection('appliance').update({
                                _id: sails.ObjectID(created.ops[0]._id)
                            }, {
                                $set: {
                                    store: createdst.ops[0]._id
                                }
                            }, function (err, updated) {
                                if (updated) {
                                    var appbrand2 = db.collection('store').update({
                                        _id: sails.ObjectID(createdst.ops[0]._id)
                                    }, {
                                        $set: {
                                            appliance: created.ops[0]._id
                                        }
                                    }, function (err, updatedst) {
                                        if (updatedst) {
                                            callback("true");

                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }
};