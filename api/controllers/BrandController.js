/**
 * BrandController
 *
 * @description :: Server-side logic for managing brands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findbrand: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        var data = Brand.findbrand(req.body, printjson);
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