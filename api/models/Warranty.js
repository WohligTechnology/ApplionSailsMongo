/**
 * Warranty.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        period: {
            type: "string"
        },
        type: {
            type: 'string',
            enum: ['onsite', 'offsite']
        },
        expiry: {
            type: 'date'
        },
        iscovered: {
            type: 'string',
            enum: ['true', 'false']
        },
        iswarrantyoramc: {
            type: 'string',
            enum: ['Extended Warranty', 'AMC']
        },
        images: {
            type: "array"
        },
        store: {
            model: "store"
        },
        purchasedfrom: {
            type: "string"
        },
        contact: {
            type: "string"
        },
        purchaseprice: {
            type: "string"
        },
        includes: {
            type: 'array'
        },
        appliance: {
            model: "appliance"
        }
    },
    createwarranty: function (str, callback) {
        if (str.purchasedate && str.period && str.purchasedate !== null && str.period !== null) {
            var purchasedate = str.purchasedate;
            var period = parseInt(str.period);
            sails.moment(new Date(purchasedate)).format('YYYY-MM-DD, h:mm:ss a');
            var expiry = sails.moment(new Date(purchasedate));
            expiry.add(period, 'months');
            str.expiry = expiry._d;
            if (str.expiry) {
                createwar(str);
            } else {
                callback({
                    value: "false"
                });
            }
        } else {
            callback({
                value: "false"
            });
        }

        function createwar(str) {
            Warranty.create(str).exec(function (error, created) {
                if (error) {
                    console.log(error);
                    callback("false");
                }
                if (created) {
                    callback(created);
                }
            });
        }
    },
    updatewarranty: function (str, callback) {
        if (str.id && str.purchasedate && str.period && str.purchasedate !== null && str.period !== null) {
            var purchasedate = str.purchasedate;
            var period = parseInt(str.period);
            sails.moment(new Date(purchasedate)).format('YYYY-MM-DD, h:mm:ss a');
            var expiry = sails.moment(new Date(purchasedate));
            expiry.add(period, 'months');
            str.expiry = expiry._d;
            if (str.expiry) {
                createwar(str);
            } else {
                callback({
                    value: "false2"
                });
            }
        } else if (str.id && str.period && str.period !== null && str.type && str.type !== null) {
            Warranty.findOne({
                id: str.id
            }).exec(function (error, found) {
                if (error) {
                    console.log(error);
                    callback({
                        value: "false1"
                    });
                }
                if (found) {
                    var purchasedate = found.purchasedate;
                    var period = parseInt(str.period);
                    sails.moment(new Date(purchasedate)).format('YYYY-MM-DD, h:mm:ss a');
                    var expiry = sails.moment(new Date(purchasedate));
                    expiry.add(period, 'months');
                    str.expiry = expiry._d;
                    if (str.expiry) {
                        createwar(str);
                    } else {
                        callback({
                            value: "false"
                        });
                    }
                }
            });
        } else {
            callback({
                value: "false3"
            });
        }

        function createwar(str) {
            var warid = str.id;
            Warranty.update({
                id: warid
            }, str).exec(function (error, updated) {
                if (error) {
                    console.log(error);
                    callback("false4");
                }
                if (updated) {
                    callback("true");
                }
            });
        }
    }
};