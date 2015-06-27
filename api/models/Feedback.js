/**
 * Feedback.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        user: {
            model: 'user'
        },
        feedback: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        email: {
            type: "string"
        }

    },
    createfeed:function(str,callback){
        Feedback.create(str).exec(function (err,created){
            if(err){
                console.log(err);
                callback("false");
            }else{
                console.log(created);
                callback("true");
            }
        });
    }
};