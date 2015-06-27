/**
 * ComponentwarrantyController
 *
 * @description :: Server-side logic for managing componentwarranties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createcw: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        }
        Componentwarranty.createcw(req.body, printjson);
    },
    updatecomponent: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        }
        Componentwarranty.updatecomponent(req.body, printjson);
    }
};