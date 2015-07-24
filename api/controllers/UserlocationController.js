/**
 * UserlocationController
 *
 * @description :: Server-side logic for managing userlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    addlocation: function (req, res) {
        var addloc = req.allParams();
        var printdata = function (data) {
            res.json(data);
        }
        Userlocation.addlocation(addloc, printdata);
    },
     updatelocation: function (req, res) {
        var addloc = req.allParams();
        var printdata = function (data) {
            res.json(data);
        }
        Userlocation.updatelocation(addloc, printdata);
    }
};