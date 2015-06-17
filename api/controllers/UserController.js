/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findall: function(req,res) {
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.findallusers(printjson);
        
    },
    
	finduserbyid: function(req,res) {
        var id=req.param('id');
        console.log(id);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.finduserbyid(id,printjson);
        
    },
    
	createuser: function(req,res) {
//        var id=req.param('id');
        var alluserdata=req.allParams();
        console.log(alluserdata);
        console.log(alluserdata.name);
        
//        var uploadFile = req.file('google');
//		console.log(uploadFile);
//
//	    uploadFile.upload(function onUploadComplete (err, files) {				
//	    //	Files will be uploaded to .tmp/uploads
//	    																		
//	    	if (err) return res.serverError(err);								
//	    	//	IF ERROR Return and send 500 error with error
//			
//	    	console.log(files);
//	    	res.json({status:200,file:files});
////	    	res.json(alluserdata);
//	    });
        
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.createuser(alluserdata,printjson);
        
    },
    
	updateuser: function(req,res) {
//        var id=req.param('id');
        var alluserdata=req.allParams();
//        console.log(alluserdata);
//        console.log(alluserdata.name);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.updateuser(alluserdata,printjson);
        
    },
    
	deleteuser: function(req,res) {
        var id=req.param('id');
        console.log(id);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.deleteuser(id,printjson);
        
    },
    
	login: function(req,res) {
        
        var logindata=req.allParams();
//        var email=req.param('email');
//        var password=req.param('password');
        console.log(logindata);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.attemptLogin(logindata,printjson);
        
    },
    
    
    
	signup: function(req,res) {
        
        var logindata=req.allParams();
//        var email=req.param('email');
//        var password=req.param('password');
        console.log(logindata);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.signup(logindata,printjson);
        
    },
    
    searchemail: function (req, res) {
        var printdata = function (data) {
            res.json(data);
        }
        var searchquery = User.searchemail(req.body, printdata);
    },
    searchdata: function (req, res) {
        
//        var data = req.allParams();
        var printda = function (data) {
            res.json(data);
        }
        User.searchdata(req.body, printda);
    },
	sendemail: function(req,res) {
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.sendemail(printjson);
        
    }
    
};

