/**
* Appliancetype.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        name: {
            type: "string",
            required: true
        },
        icon: {
            type: "string"
        },
        abbreviation: {
            type: 'string'
        },
        brand: {
            model:"brand"
        }
  },
//    upload: function (str,data,callback) {
//        console.log(str);
//        Appliancetype.update({
//            id: str.id
//        },{
//            icon: data[0].fd
//        }).exec(function (error1, updated) {
//            if (error1) {
//                console.log(error1);
//                callback(error1);
//                //                        callback(error1);
//            }
//            else
//            {
//                callback(updated);
//                console.log(updated);
//            }
//        });
//        //                console.log(found);
//    }
};

