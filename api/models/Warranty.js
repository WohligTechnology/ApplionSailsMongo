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
            type: "date"
        },
        iscovered: {
            type: 'string',
            enum: ['true', 'false']
        },
        iswarrantyoramc: {
            type: 'string',
            enum: ['Extended Warranty', 'AMC']
        },
        purchasedate: {
            type: "date"
        },
        billno: {
            type: "string"
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
            console.log("in if");
            var purchasedate = str.purchasedate;
            var period = parseInt(str.period);
            sails.moment(new Date(purchasedate)).format('YYYY-MM-DD, h:mm:ss a');
            var expiry = sails.moment(new Date(purchasedate));
            console.log(expiry._d);
            expiry.add(period, 'months');
            str.expiry = expiry._d;
            console.log(str.expiry);
            if (str.expiry) {
                createwar(str);
            } else {
                console.log("false");
                callback({
                    value: "false"
                });
            }

        } else if (str.purchasedate && str.purchasedate !== null && str.billno && str.billno !== null) {
            createwar(str);
        } else {
            console.log("false");
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
                    console.log(created);
                    callback(created);
                }
            });
        }
    },
    updatewarranty: function (str, callback) {
        if (str.purchasedate && str.period && str.purchasedate !== null && str.period !== null) {
            console.log("in if");
            var purchasedate = str.purchasedate;
            var period = parseInt(str.period);
            sails.moment(new Date(purchasedate)).format('YYYY-MM-DD, h:mm:ss a');
            var expiry = sails.moment(new Date(purchasedate));
            console.log(expiry._d);
            expiry.add(period, 'months');
            str.expiry = expiry._d;
            console.log(str.expiry);
            if (str.expiry) {
                createwar(str);
            } else {
                console.log("false");
                callback({
                    value: "false"
                });
            }

        } else if (str.purchasedate && str.purchasedate !== null && str.billno && str.billno !== null) {
            createwar(str);
        } else {
            console.log("false");
            callback({
                value: "false"
            });
        }

        function createwar(str) {
            var warid = str.id;
            Warranty.update({
                id: warid
            }, str).exec(function (error, updated) {
                if (error) {
                    console.log(error);
                    callback("false");
                } else {
                    console.log(updated);
                    callback("true");
                }
            });
        }
    }
};