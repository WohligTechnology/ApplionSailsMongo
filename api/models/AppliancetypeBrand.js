/**
 * AppliancetypeBrand.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        appliancetypebrandid: {
            type: "string"
        },
        appliancetypeid: {
            type: "string"
        },
        brandid: {
            type: "string"
        },
    },
    createappbrand: function (str) {
        AppliancetypeBrand.create(str).exec(function (err, created) {
            if (err) {
                console.log(err);
            } else {
                console.log("created");
            }
        });
    }
};