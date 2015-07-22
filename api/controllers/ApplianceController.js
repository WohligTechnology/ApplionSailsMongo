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
    },
    updateappliance: function (req, res) {
        var printda = function (data) {
            res.json(data);
        }
        Appliance.updateappliance(req.body, printda);
    },
    findbyid: function (req, res) {
        var printda = function (data) {
            res.json(data);
        }
        Appliance.findbyid(req.body, printda);
    },
    createappliance: function (req, res) {
        var printda = function (data) {
            res.json(data);
        }
        Appliance.createappliance(req.body, printda);
    },
    firstappliance: function (req, res) {
        var printda = function (data) {
            res.json(data);
        }
        Appliance.firstappliance(req.body, printda);
    },
    getappliance: function (req, res) {
        var printda = function (data) {
            res.json(data);
        }
        Appliance.getappliance(req.body, printda);
    }
};