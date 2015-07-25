/**
 * Store.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {
        name: {
            type: "string"
        },
        purchasedate: {
            type: 'date'
        },
        billno: {
            type: "string"
        },
        email: {
            type: "email"
        },
        contact: {
            type: "string"
        },
        saleperson: {
            type: "string"
        },
        smsnumber: {
            type: "string"
        },
        smsformat: {
            type: "string"
        },
        address: {
            type: "text"
        },
        lat: {
            type: "string"
        },
        long: {
            type: "string"
        },
        district: {
            type: "string"
        },
        state: {
            type: "string"
        },
        country: {
            model: "country"
        },
        pincode: {
            type: "string"
        },
        status: {
            type: 'string',
            enum: ['publish for user', 'unpublished']
        },
        user: {
            model: 'user'
        },
        type: {
            type: 'string',
            enum: ['callcenter', 'brandservice center', 'authorised service provider', 'organized service center', 'other service provider', 'store', 'storenservice']
        },
        totalaveragerating: {
            type: "string"
        },
        timeto: {
            type: 'string',
            enum: ['00:00 AM', '00:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
        },
        timefrom: {
            type: 'string',
            enum: ['00:00 AM', '00:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
        },
        workingdays: {
            type: "array"
        },
        pancard: {
            type: "string"
        },
        pancardimage: {
            type: "string"
        },
        samplebillimage: {
            type: "string"
        },
        storephotoimage: {
            type: "string"
        },
        licenseimage: {
            type: "string"
        },
        rating: {
            collection: "rating",
            via: "store"
        },
        callrating: {
            collection: "callrating",
            via: "storeofcallrating"
        },
        servicereport: {
            collection: "servicereport",
            via: "storeofservicereport"
        },
        holidaycalender: {
            model: 'holidaycalender'
        },
        appliance: {
            model: "appliance"
        }
    },
    createstore: function (str, callback) {
        var returns = [];
        str.id = sails.ObjectID(str.id);
        str.appliance = sails.ObjectID(str.appliance);
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (err) {
                console.log(err);
                callback({
                    value: "false"
                });
            }
            if (db) {
                db.collection('store').update({
                    _id: str.id,
                    appliance: str.appliance
                }, {
                    $set: str
                }, function (err, updated) {
                    if (err) {
                        console.log(err);
                        callback({
                            value: "false"
                        });
                    }
                    if (updated) {
                        callback({
                            value: "true"
                        });
                    }
                });
            }
        });
    }
};