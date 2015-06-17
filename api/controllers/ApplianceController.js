/**
 * ApplianceController
 *
 * @description :: Server-side logic for managing appliances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchdata: function (req, res) {
//        var data = req.allParams();
        var printda = function (data) {
            res.json(data);
        }
        Appliance.searchdata(req.body, printda);
    }
};

