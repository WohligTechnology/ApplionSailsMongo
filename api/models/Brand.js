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
        Brand.find({"appliancetype_brands" : "5582c26acdfca7781c975036"}).exec(function (error, found) {
            if (found) {
                console.log(found);
                callback(found);
            } else {
                console.log(error);
                callback(error);
            }
        });
    },
    
    
    searchbrand: function (str, callback) {
        var check = str.name;
        Brand.find({
                name: {
                    'like': '%' + check + '%'
                }
        }).exec(function findCB(error, found) {
            if (found.length) {
                console.log(found);
                callback(found);
            } else {
                callback(error);
            }
        });
    }
};