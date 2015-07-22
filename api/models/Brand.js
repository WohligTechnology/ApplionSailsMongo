/**
 * Brand.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {

    attributes: {
        brandid: {
            type: "string",
            required: true
        },
        name: {
            type: "string",
            required: true
        },
        abbrevation: {
            type: 'string'
        },
        image: {
            type: "string"
        },
        status: {
            type: 'string',
            enum: ['IsPublished for User', 'Not Published for User']
        },
        appliancetype: {
            collection: "appliancetype",
            via: "brand"
        }

    },
    createbrand: function (str) {
        Brand.create(str).exec(function (err, created) {
            if (err) {
                console.log(err);
            } else {
                console.log(created);
            }
        });
    },
    findbrand: function (str, callback) {
        var returns = [];

        var totalcallbacks = 0;
        var array1 = 0;

        function callback2(data) {
            totalcallbacks++;
            if (totalcallbacks == array1) {
                var data2 = _.uniq(data, function (n) {
                    return n.brandid;
                });
                callback(data2);
            }

        }

        sails.MongoClient.connect(sails.url, function (err, db) {
            if (db) {
                db.collection('appliancetypebrand').find({
                    appliancetypeid: str.appliancetype
                }).toArray(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback({
                            value: "false"
                        });
                    }
                    if (data != null) {

                        array1 = data.length;
                        for (var i = 0; i < data.length; i++) {
                            db.collection('brand').find({
                                brandid: data[i].brandid
                            }).toArray(function (err, data2) {
                                if (err) {
                                    console.log(err);
                                    callback({
                                        value: "false"
                                    });
                                }
                                if (data2 != null) {
                                    returns = returns.concat(data2);
                                    callback2(returns);
                                } else {
                                    callback({
                                        value: "false"
                                    });
                                }
                            });
                        }

                    } else {
                        callback({
                            value: "false"
                        });

                    }
                });
            }
        });
    },
    findname: function (str, callback) {
        var returns = [];
        var totalcallbacks = 0;
        var array1 = 0;

        function callback2(data) {
            totalcallbacks++;
            if (totalcallbacks == array1) {
                callback(data);
            }
        }
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (db) {
                db.collection('appliancetypebrand').find({
                    appliancetypeid: str.name
                }).toArray(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback({
                            value: "false"
                        });
                    }
                    if (data != null) {
                        console.log(data);
                        array1 = data.length;
                        for (var i = 0; i < data.length; i++) {
                            console.log(data[i]._id);
                            db.collection('brand').find({
                                brandid: data[i].brandid + ""
                            }).toArray(function (err, data2) {
                                console.log(data2);
                                if (err) {
                                    console.log(err);
                                    callback({
                                        value: "false"
                                    });
                                }
                                if (data2 != null) {
                                    returns = returns.concat(data2);
                                    callback2(returns);
                                } else {
                                    callback({
                                        value: "false"
                                    });
                                }
                            });

                        }
                    } else {
                        callback({
                            value: "false"
                        });
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
    },
    findlikebrand: function (str, callback) {
        var returns = [];
        var totalcallbacks = 0;
        var array1 = 0;
        var check = new RegExp(str.name, "i");

        function callback2(data) {
            totalcallbacks++;

            if (totalcallbacks == array1) {
                var data2 = _.uniq(data, function (n) {
                    return n.brandid;
                });
                callback(data2);
            }
        }
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (db) {
                db.collection('appliancetypebrand').find({
                    appliancetypeid: str.appliancetype
                }).toArray(function (err, data) {
                    if (err) {
                        //console.log(err);
                        callback({
                            value: "false"
                        });
                    }
                    if (data != null) {
                        array1 = data.length;
                        for (var i = 0; i < data.length; i++) {
                            db.collection('brand').find({
                                name: {
                                    '$regex': check
                                },
                                brandid: data[i].brandid + ""
                            }).toArray(function (err, data2) {
                                //console.log(data2);
                                if (err) {
                                    console.log(err);
                                    callback({
                                        value: "false"
                                    });
                                }
                                if (data2 != null) {
                                    returns = returns.concat(data2);
                                    callback2(returns);
                                } else {
                                    callback({
                                        value: "false"
                                    });
                                }
                            });

                        }
                    } else {
                        callback({
                            value: "false"
                        });
                    }
                });
            }
        });
    }
};