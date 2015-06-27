/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createfeed:function (req,res){
        var printjson= function(data){
            res.json(data);
        }
        Feedback.createfeed(req.body,printjson);
    }
};

