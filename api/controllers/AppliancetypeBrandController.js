/**
 * AppliancetypeBrandController
 *
 * @description :: Server-side logic for managing Appliancetypebrands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    excelobject: function (req, res) {
        var file = req.query.file;
        sails.xlsxj({
            input: "./uploads/" + file,
            output: "./uploads/output2.json"
        }, function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    AppliancetypeBrand.createappbrand(result[i]);
                }
            }
        });
    },
    createappbrand: function (req, res) {
        var printdata = function (data) {
            res.json(data);
        }
        AppliancetypeBrand.createappbrand(req.body);
    },
};