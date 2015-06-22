/**
 * BrandController
 *
 * @description :: Server-side logic for managing brands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findbrand: function(req, res) {
//        var logindata= req.allParams();
//        console.log(logindata);
        var printjson=function(data) {
            res.json(data);
        };
        var data=Brand.findbrand(req.body,printjson);
    },
    searchbrand: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Brand.searchbrand(req.body, printdata);
    }
};