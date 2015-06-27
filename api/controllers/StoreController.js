/**
 * StoreController
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createstore:function (req,res){
        var printjson= function(data){
            res.json(data);
        }
        Store.createstore(req.body,printjson);
    }
};

