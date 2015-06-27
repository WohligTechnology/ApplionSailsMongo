/**
 * WarrantyController
 *
 * @description :: Server-side logic for managing warranties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    updatewarranty: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        }
        Warranty.updatewarranty(req.body,printjson);
    },
    createwarranty: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        }
        Warranty.createwarranty(req.body,printjson);
    }
};