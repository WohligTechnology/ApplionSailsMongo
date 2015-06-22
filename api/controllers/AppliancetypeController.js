/**
 * AppliancetypeController
 *
 * @description :: Server-side logic for managing appliancetypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    searchproduct: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Appliancetype.searchproduct(req.body, printdata);
    }
};