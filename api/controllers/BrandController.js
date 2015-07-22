/**
 * BrandController
 *
 * @description :: Server-side logic for managing brands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    excelobject: function (req, res) {
        var file = req.query.file;
        sails.xlsxj({
            input: "./uploads/" + file,
            output: "./uploads/output1.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    Brand.createbrand(result[i]);
                }
            }
        });
    },
    createbrand: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Brand.createbrand(req.body);
    },
    findbrand: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        var data = Brand.findbrand(req.body, printjson);
    },
    findlikebrand: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        var data = Brand.findlikebrand(req.body, printjson);
    },
    findname: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        Brand.findname(req.body, printjson);
    },
    searchbrand: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Brand.searchbrand(req.body, printdata);
    }
};