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
        var alluserdata=req.allParams();
        console.log(alluserdata);
        console.log(alluserdata.name);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.createuser(alluserdata,printjson);
        
    },
    
	updateuser: function(req,res) {
        var alluserdata=req.allParams();
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
    changepassword: function(req,res) {
        
        var logindata=req.allParams();
        console.log(logindata);
        var printjson=function(data) {
            res.json(data);
        };
        var data=User.changepassword(logindata,printjson);
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

