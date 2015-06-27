/**
* Componentwarranty.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        component: {
            type: "string",
            required: true
        },
        serial: {
            type: 'string'
        },
        warrantyperiod: {
            type: "integer"
        },
        bill: {
            type: 'string'
        },
        warrantycard: {
            type: 'string'
        },
        startdate:{
            type:'date'
        },
        appliance: {
            model: "appliance"
        }
  },
    createcw:function(str,callback){
        Componentwarranty.create(str).exec(function (err,created){
            if(err){
                console.log(err);
                callback("false");
            }
            else{
                console.log(created);
                callback("true");
            }
        });
    },
    updatecomponent:function(str,callback){
         Componentwarranty.update({id:str.id},str).exec(function (err,updated){
            if(err){
                console.log(err);
                callback("false");
            }
            else{
                console.log(updated);
                callback("true");
            }
        });
    }
};

