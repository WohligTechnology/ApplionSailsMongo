/**
 * AppliancetypeController
 *
 * @description :: Server-side logic for managing appliancetypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    excelobject: function (req, res) {
        var file = req.query.file;
        sails.xlsxj({
            input: "./uploads/" + file,
            output: "./uploads/output.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log(result[5]);
                result[5].icon = result[5].icon.split('\\').pop().split('/').pop();
                console.log(result[5].icon);
                for (var i = 0; i <= result.length; i++) {
                    Appliancetype.createproduct(result[i], print);
                }
            }
        });
    },
    createproduct: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Appliancetype.createproduct(req.body, printdata);
    },
    searchproduct: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Appliancetype.searchproduct(req.body, printdata);
    },
    findallproducts: function (req, res) {
        console.log(req.body);
        var printdata = function (data) {
            res.json(data);
        }
        Appliancetype.findallproducts(req.body, printdata);
    }
};