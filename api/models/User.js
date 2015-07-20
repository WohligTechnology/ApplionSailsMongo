/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var fs = require('fs');
var md5 = require('MD5');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;
var md5 = require('MD5');
var mandrill = require('mandrill-api/mandrill');
mandrill_client = new mandrill.Mandrill('dzbY2mySNE_Zsqr3hsK70A');
module.exports = {
    attributes: {
        name: {
            type: "string"
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
        location: {
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
    },
    findallusers: function (callback) {
        console.log("hello");
        User.find().paginate({
            page: 1,
            limit: 2
        }, {
            fields: {
                password: 0,
                cpassword: 0,
                editpassword: 0,
                editcpassword: 0,
                forgotpassword: 0
            }
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
        User.find({
            id: str.id
        }, {
            fields: {
                password: 0,
                cpassword: 0,
                editpassword: 0,
                editcpassword: 0,
                forgotpassword: 0
            }
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
        str.password = md5(str.passowrd);
        User.create(str).exec(function (err, created) {
            if (err) {
                console.log(err);
                callback("false");
            } else {
                console.log(created);
                callback("true");
            }
        });
    },
    updateuser: function (str, callback) {
        User.update({
            id: str.id
        }, str).exec(function (err, updated) {
            if (err) {
                console.log(err);
                callback("false");
            } else {
                console.log(updated);
                callback("true");
            }
        });
    },

    deleteuser: function (str, callback) {
        console.log("hello" + str);
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
    searchmail: function (data, callback) {
        var exit = 0;
        var exitup = 0;
        sails.MongoClient.connect(sails.url, function (err, db) {
            if (err) {
                console.log(err);
                callback({
                    value: false
                });
            }
            if (db) {
                exit++;
                db.collection("user").find({
                    "email": data.email
                }).each(function (err, data) {
                    if (err) {
                        console.log(err);
                        callback({
                            value: false
                        });
                    }
                    if (data != null) {
                        exitup++;
                        callback({
                            value: true
                        });
                    } else {
                        if (exit != exitup) {
                            callback({
                                value: false
                            });
                        }
                    }
                });
            }
        });
    },
    login: function (inputs, callback) {
        console.log(inputs);
        inputs.password = md5(inputs.password);
        console.log(inputs.password);
        User.findOne({
            email: inputs.email,
            password: inputs.password
        }, {
            fields: {
                password: 0,
                cpassword: 0,
                editpassword: 0,
                editcpassword: 0,
                forgotpassword: 0
            }
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
                                    delete found.password;
                                    delete found.cpassword;
                                    delete found.editpassword;
                                    delete found.editcpassword;
                                    delete found.forgotpassword;
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
                    callback(data);
                } else {
                    callback("false");
                }
            });
    },

    changepassword: function (str, callback) {
        var prevpassword = "";
        str.password = md5(str.password);

        function check() {
            console.log(str.password);
            str.editpassword = "";
            User.update({
                id: str.id
            }, {
                password: str.password
            }).exec(function afterwards(error, updated) {
                if (error) {
                    console.log(error);
                    callback("false");
                }
                if (updated) {
                    callback("true");
                }
            });
        }
        if (str.editpassword == "") {
            console.log("in if");
            User.findOne({
                id: str.id
            }).exec(function (error, data) {
                if (error) {
                    console.log(error);
                    callback("false");
                }
                if (data) {
                    prevpassword = data.password;
                    str.password = prevpassword;
                    check();
                }
            });
        } else {
            console.log("in else");
            console.log(str);
            User.findOne({
                id: str.id,
                password: str.password
            }).exec(function findOneCB(error, data) {
                if (data) {
                    console.log("in in else");
                    str.password = md5(str.editpassword);
                    check();
                } else {
                    console.log(error);
                    callback("false");
                }
            });
        }
    },

    forgotpassword: function (str, callback) {
        User.findOne(str).exec(function findOneCB(error, found) {
            if (error) {
                callback("false");
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
                        callback("false");
                    }
                    if (updated) {
                        console.log(updated);
                        var template_name = "Applion";
                        var template_content = [{
                            "name": "applion",
                            "content": "applion"
    }]
                        var message = {
                            "from_email": "vigneshkasthuri2009@gmail.com",
                            "from_name": "Wohlig",
                            "to": [{
                                "email": str.email,
                                "type": "to"
        }],
                            "global_merge_vars": [
                                {
                                    "name": "password",
                                    "content": text
  }
]
                        };
                        mandrill_client.messages.sendTemplate({
                            "template_name": template_name,
                            "template_content": template_content,
                            "message": message
                        }, function (result) {
                            console.log(result);
                            callback(result);
                        }, function (e) {
                            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                        });
                    }
                });
            }
        });
    }
};