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
            type: "string"
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
        bill: {
            type: "string"
        },
        warrantycard: {
            type: "string"
        },
        note: {
            type: "string"
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
    findbyid: function (str, callback) {
        var id = str.id;

        function callback2(data) {
            callback(data);
        }
        Appliance.find({
            id: id
        }).populate("warranty").populate("componentwarranty").populate("user").populate("userlocation").populate("appliancetype").populate("brand").populate("store").exec(function (error, data) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (data[0]) {
                if (data[0].warranty && data[0].warranty[0]) {
                    if (data[0].warranty[data[0].warranty.length - 1].expiry) {
                        var newdate = sails.moment(new Date());
                        var currentdate = newdate._d;
                        var expiry = data[0].warranty[data[0].warranty.length - 1].expiry;
                        data[0].days = Math.floor((expiry - currentdate) / 86400000);
                        if (data[0].days != null) {
                            delete data[0].user.password;
                            callback2(data[0]);
                        }
                    } else {
                        delete data[0].user.password;
                        callback2(data[0]);
                    }
                } else {
                    delete data[0].user.password;
                    callback2(data[0]);
                }
            } else {
                callback({
                    value: "false"
                });
            }
        });

    },
    searchdata: function (str, callback) {
        var check = str.search;
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
                callback(found);
            } else {
                callback("false");
            }
        });
    },
    getappliance: function (str, callback) {
        var user = str.user;
        var totalcallbacks = 0;
        var array1 = 10000;

        function callback2(data) {
            totalcallbacks++;
            if (totalcallbacks == array1) {
                callback(data);
            }

        }
        sails.MongoClient.connect(sails.url, function (err, db) {

            if (db) {
                db.collection('appliance').find({
                    user: user
                }).toArray(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback({
                            value: "false"
                        });
                    }
                    if (data[0]== null) {
                        console.log(data);
                        callback(data);
                    }
                    if (data != null) {
                        array1 = 3 * data.length;
                        _.each(data, function (n) {
                            db.collection('appliancetype').find({
                                _id: sails.ObjectID(n.appliancetype)
                            }).toArray(function (err, data2) {

                                if (err) {
                                    console.log(err);
                                    callback("false");
                                }

                                if (data2.length > 0) {
                                    n.icon = data2[0].icon;

                                }
                                callback2(data);
                            });
                            db.collection('brand').find({
                                _id: sails.ObjectID(n.brand)
                            }).toArray(function (err, data3) {
                                if (err) {
                                    console.log(err);
                                    callback("false");
                                }
                                if (data3.length > 0) {
                                    n.brandname = data3[0].name;
                                }
                                callback2(data);
                            });
                            db.collection('warranty').find({
                                appliance: sails.ObjectID(n._id)
                            }).toArray(function (err, data4) {
                                if (data4.length > 0) {
                                    if (data4[data4.length - 1].expiry != null) {
                                        var expiry = data4[data4.length - 1].expiry;
                                        var newdate = sails.moment(new Date());
                                        var currentdate = newdate._d;
                                        n.days = Math.floor((expiry - currentdate) / 86400000);
                                        n.isdays = "true";
                                    } else {
                                        n.isdays = "false";
                                    }
                                } else if (data4.length <= 0) {
                                    n.isdays = "false";
                                }
                                callback2(data);
                            });
                        });
                    } else {

                        callback({
                            value: "false"
                        });

                    }
                });
            }
            if (err) {
                console.log(err);
                callback({
                    value: "false"
                });
            }
        });
    },
    updateappliance: function (str, callback) {
        str.id = sails.ObjectID(str.id);
        sails.MongoClient.connect(sails.url, function (err, db) {
            var appbrand = db.collection('appliance').update({
                _id: str.id
            }, {
                $set: str
            }, function (err, updated) {
                if (updated) {
                    callback("true");
                }
            });
        });
    },
    createappliance: function (str, callback) {
        var returns = [];
        var storedata = {};
        var exit = 0;
        var exitup = 0;
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (db) {
                db.collection('appliance').insert(str, function (err, created) {
                    if (created) {
                        var createst = db.collection('store').insert(storedata, function (err, createdst) {
                            if (createdst) {
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
                                                exit++;
                                                db.collection('appliance').find({
                                                    _id: sails.ObjectID(created.ops[0]._id)
                                                }).toArray(function (err, data) {
                                                    if (err) {
                                                        callback({
                                                            value: "false"
                                                        });
                                                    }
                                                    if (data != null) {
                                                        exitup++;
                                                        if (exit == exitup) {
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
                                    }
                                });
                            }
                        });
                    }
                });
            }
            if (err) {
                console.log(err);
                callback({
                    value: "false"
                });
            }
        });
    },
    firstappliance: function (str, callback) {
        var warrantydata = str.iscovered;
        delete str.iscovered;
        var storedata = {};
        var wardata = {};
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (db) {
                db.collection('appliance').insert(str, function (err, created) {
                    if (created) {
                        db.collection('store').insert(storedata, function (err, createdst) {
                            if (createdst) {
                                var appbrand1 = db.collection('appliance').update({
                                    _id: sails.ObjectID(created.ops[0]._id)
                                }, {
                                    $set: {
                                        store: createdst.ops[0]._id
                                    }
                                }, function (err, updated) {
                                    if (updated) {
                                        db.collection('store').update({
                                            _id: sails.ObjectID(createdst.ops[0]._id)
                                        }, {
                                            $set: {
                                                appliance: created.ops[0]._id
                                            }
                                        }, function (err, updatedst) {

                                        });
                                    }
                                });
                            }
                        });
                        db.collection('warranty').insert(wardata, function (err, createw) {
                            if (createw) {
                                db.collection('warranty').update({
                                    _id: sails.ObjectID(createw.ops[0]._id)
                                }, {
                                    $set: {
                                        appliance: created.ops[0]._id,
                                        iscovered: warrantydata
                                    }
                                }, function (err, updatedst) {
                                    if (updatedst) {
                                        callback({
                                            value: "true"
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            if (err) {
                console.log(err);
                callback({
                    value: "false"
                });
            }
        });
    }
};