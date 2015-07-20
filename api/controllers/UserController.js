/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    uploadfile: function (req, res) {
        req.file("file").upload(function (err, uploadedFiles) {
            if (err) return res.send(500, err);
            _.each(uploadedFiles, function (n) {
                var oldpath = n.fd;
                var source = sails.fs.createReadStream(n.fd);
                n.fd = n.fd.split('\\').pop().split('/').pop();
                var dest = sails.fs.createWriteStream('./uploads/' + n.fd);
                source.pipe(dest);
                source.on('end', function () {
                    sails.fs.unlink(oldpath, function (data) {
                        console.log(data);
                    });
                });
                source.on('error', function (err) {
                    console.log(err);
                });
            });
            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully!',
                files: uploadedFiles
            });
        });
    },
    createuser: function (req, res) {
        var alluserdata = req.allParams();
        console.log(alluserdata);
        console.log(alluserdata.name);
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.createuser(alluserdata, printjson);

    },
    updateuser: function (req, res) {
        var alluserdata = req.allParams();
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.updateuser(alluserdata, printjson);
    },

    deleteuser: function (req, res) {
        var id = req.param('id');
        console.log(id);
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.deleteuser(id, printjson);
    },

    login: function (req, res) {
        var logindata = req.allParams();
        console.log(logindata);
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.login(logindata, printjson);
    },

    changepassword: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        User.changepassword(req.body, printjson);
    },
    searchmail: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        User.searchmail(req.body, printjson);
    },

    signup: function (req, res) {
        var logindata = req.allParams();
        console.log(logindata);
        var printjson = function (data) {
            res.json(data);
        };
        var data = User.signup(logindata, printjson);
    },

    forgotpassword: function (req, res) {
        var printdata = function (data) {
            res.json(data);
        }
        User.forgotpassword(req.body, printdata);
    }
};