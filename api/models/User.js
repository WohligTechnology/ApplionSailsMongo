/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var fs = require('fs');
var md5 = require('MD5');
//var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;

module.exports = {

    attributes: {
        name: {
            type: "string",
            required: true
        },
        email: {
            type: "email",
            unique: true,
            required: true
        },
        password: {
            type: 'string'
        },
        contact: {
            type: "string"
        },
        pooshwooshid: {
            type: "string"
        },
        pin: {
            type: "string"
        },
        gender: {
            type: 'string',
            enum: ['male', 'female']
        },
        dob: {
            type: 'date'
        },
        district: {
            type: 'string'
        },
        state: {
            type: 'string'
        },
        country: {
            model: 'country'
        },
        pincode: {
            type: 'string'
        },
        google: {
            type: 'string'
        },
        twitter: {
            type: 'string'
        },
        facebook: {
            type: 'string'
        },
        forgotpassword: {
            type: "string"
        },
        accesslevel: {
            type: 'string',
            enum: ['user', 'admin', 'store']
        },
        userlocation: {
            collection: "userlocation",
            via: "user"
        }
        //    }
    },
    findallusers: function (callback) {
        console.log("hello");
        User.find().paginate({
            page: 1,
            limit: 2
        }).populate("userlocation").exec(function (error, data) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (data) {
                console.log(data);
                callback(data);
            }
        });

    },

    finduserbyid: function (str, callback) {
        console.log("hello" + str);
        //        User.find({ id: { 'like': '%'+str+'%' }}).populate("userlocation").exec(function(error,data) {
        User.find({
            id: str
        }).populate("userlocation").exec(function (error, data) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (data) {
                console.log(data);
                callback(data);
            }
        });

    },

    createuser: function (str, callback) {
        //        User.find({ id: { 'like': '%'+str+'%' }}).populate("userlocation").exec(function(error,data) {
        //        User.find({ id: str}).populate("userlocation").exec(function(error,data) {
        str.password = md5(str.password);
        User.create(str).exec(function createCB(error, created) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (created) {
                console.log(created);
                callback(created);
            }
        });

    },
    updateuser: function (str, callback) {
        var prevpassword = "";
        str.editcpassword = "";
        //        User.find({ id: str}).populate("userlocation").exec(function(error,data) {
        //            var prevdata=data;
        //        });
        //        User.find({ id: { 'like': '%'+str+'%' }}).populate("userlocation").exec(function(error,data) {
        //        User.find({ id: str}).populate("userlocation").exec(function(error,data) {
        //            User.create(str).exec(function createCB(error, created){
        function check() {
            console.log(str.password);
            str.editpassword = "";
            User.update({
                id: str.id
            }, str).exec(function afterwards(error, updated) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
                if (updated) {
                    //                console.log(updated);
                    callback(updated);
                }
            });
        }
        if (str.editpassword == "") {
            User.findOne({
                id: str.id
            }).exec(function (error, data) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
                if (data) {
                    console.log(data);
                    prevpassword = data.password;
                    str.password = prevpassword;
                    check();
                }
            });
        } else {
            str.password = md5(str.editpassword);
            check();
        }
    },

    deleteuser: function (str, callback) {
        console.log("hello" + str);
        //        User.find({ id: { 'like': '%'+str+'%' }}).populate("userlocation").exec(function(error,data) {
        //        User.find({ id: str}).populate("userlocation").exec(function(error,data) {
        User.destroy({
            id: str
        }).exec(function deleteCB(error) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (!error) {
                callback("The record has been deleted Successfully!!!");
            }
        });

    },

    login: function (str, callback) {
        var email = str.email;
        var password = str.password;
        console.log(email);
        console.log(password);
        console.log("hello" + str);
        //        User.find({ id: { 'like': '%'+str+'%' }}).populate("userlocation").exec(function(error,data) {
        //        User.find({ id: str}).populate("userlocation").exec(function(error,data) {
        User.find({
            or: [{
                email: "'" + email + "'"
            }, {
                password: "'" + password + "'"
            }]
        }).exec(function (error, data) {
            if (error) {
                console.log(error);
                callback(error);
            }
            if (data) {
                console.log(data);
                callback(data);
            }
        });

    },
    attemptLogin: function (inputs, callback) {
        // Create a user
        console.log(inputs);
        inputs.password = md5(inputs.password);
        console.log(inputs.password);
        User.findOne({
            email: inputs.email,
            password: inputs.password
        }).exec(function findOneCB(error, found) {
            if (found) {
                console.log(found);
                callback(found);
            } else {
                if (inputs.password == "") {
                    callback("Password Could not be Blank!!!");
                } else {
                    User.findOne({
                        email: inputs.email,
                        forgotpassword: inputs.password
                    }).exec(function findOneCB(error, found) {
                        if (found) {
                            console.log(found);
                            User.update({
                                id: found.id
                            }, {
                                password: inputs.password,
                                forgotpassword: ''
                            }).exec(function afterwards(error, updated) {
                                if (error) {
                                    console.log(error);
                                    callback(error);
                                }
                                if (updated) {
                                    console.log(found);
                                    callback(found);
                                }
                            });
                        } else {
                            callback("Please Enter Correct Email Or Password !!!");
                        }

                    });
                }
            }

        });
    },

    signup: function (inputs, callback) {
        var hash = md5(inputs.password);
        User.create({
                name: inputs.name,
                email: inputs.email,
                password: hash
            })
            .exec(function (error, data) {
                console.log(data);
                if (data) {
                    //                    console.log(data);
                    callback(data);
                } else {
                    callback(error);
                }
            });
    },
    changepassword: function (str, callback) {
        var prevpassword = "";
        str.editcpassword = "";
        str.password=md5(str.password);
        function check() {
            console.log(str.password);
            str.editpassword = "";
            User.update({
                id: str.id
            }, {password:str.password}).exec(function afterwards(error, updated) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
                if (updated) {
                    callback(updated);
                }
            });
        }
        if (str.editpassword == "") {
            User.findOne({
                id: str.id
            }).exec(function (error, data) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
                if (data) {
                    console.log(data);
                    prevpassword = data.password;
                    str.password = prevpassword;
                    check();
                }
            });
        } else {
            User.findOne({id: str.id,password:str.password}).exec(function (error, data) {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    str.password = md5(str.editpassword);
                    check();
//                    console.log(str.password);
//                    callback(str.password);
                }
            });
        }
    },
    searchemail: function (str, callback) {
        User.findOne(str).exec(function findOneCB(error, found) {
            if (error) {
                callback(error);
            } else {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 8; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                console.log(text);
                User.update({
                    email: str.email
                }, {
                    forgotpassword: md5(text)
                }).exec(function afterwards(error1, updated) {
                    if (error1) {
                        console.log(error1);
                        callback(error1);
                    }
                    if (updated) {
                        console.log(updated);
                        callback(updated);
                    }
                });
                //                console.log(found);
            }
        });
    },
    searchdata: function (str, callback) {
        var check = str.search;
        console.log(check);
        User.find({
            or: [{
                name: {
                    'like': '%' + check + '%'
                }
            }, {
                email: {
                    'like': '%' + check + '%'
                }
            }, {
                contact: {
                    'like': '%' + check + '%'
                }
            }, {
                pincode: {
                    'like': '%' + check + '%'
                }
            }, {
                address: {
                    'like': '%' + check + '%'
                }
            }]
        }).exec(function findCB(error, found) {
            if (found.length) {
                console.log("found");
                console.log(found);
                callback(found);
            } else {
                callback(error);
            }
        });
    },

    sendemail: function (callback) {
        console.log("hello");
        User.sendmail({
            to: [{
                name: 'Avinash',
                email: 'avinash@wohlig.com'
  }],
            subject: 'omg i love you guys!!1',
            html: 'I can\'t wait to see you all in Chicago<br/>' +
                'I loe you so much!!!! ',
            text: 'text fallback goes here-- in case some recipients (let\'s say the Chipettes)  can\'t receive HTML emails'
        }, function optionalCallback(err) {
            console.log(err);
            // If you need to wait to find out if the email was sent successfully, 
            // or run some code once you know one way or the other, here's where you can do that. 
            // If `err` is set, the send failed.  Otherwise, we're good! 
        });

    }



};