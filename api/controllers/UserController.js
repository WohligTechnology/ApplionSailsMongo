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
     resize: function (req, res, extension) {
        function showimage(path) {
            var image = sails.fs.readFileSync(path);
            var mimetype = mime.lookup(path);
            res.set('Content-Type', mimetype);
            res.send(image);
        }

        function checknewfile(newfilepath, width, height) {
            width = parseInt(width);
            height = parseInt(height);
            newfilenamearr = newfilepath.split(".");
            extension = newfilenamearr.pop();

            var indexno = newfilepath.search("." + extension);
            var newfilestart = newfilepath.substr(0, indexno);
            var newfileend = newfilepath.substr(indexno, newfilepath.length);



            var newfilename = newfilestart + "_" + width + "_" + height + newfileend;
            console.log(newfilename);
            var isfile2 = sails.fs.existsSync(newfilename);
            if (!isfile2) {

                lwip.open(newfilepath, function (err, image) {

                    var dimensions = {};
                    dimensions.width = image.width();
                    dimensions.height = image.height();
                    if (width == 0) {
                        width = dimensions.width / dimensions.height * height;
                    }
                    if (height == 0) {
                        height = dimensions.height / dimensions.width * width;
                    }
                    console.log(err);
                    image.resize(width, height, "lanczos", function (err, image) {

                        // check err...
                        // manipulate some more:
                        image.toBuffer(extension, function (err, buffer) {

                            sails.fs.writeFileSync(newfilename, buffer);
                            showimage(newfilename);
                            // check err...
                            // save buffer to disk / send over network / etc.

                        });

                    });

                });

            } else {
                showimage(newfilename);
            }
        }

        var file = req.query.file;
        var filepath = './uploads/' + file;
        var newheight = req.query.height;
        var newwidth = req.query.width;


        var isfile = sails.fs.existsSync(filepath);
        if (!isfile) {
            res.json({
                message: "File not found",
                value: "false"
            });
        } else {

            if (!newwidth && !newheight) {
                showimage(filepath);
            } else if (!newwidth && newheight) {
                newheight = parseInt(newheight);
                checknewfile(filepath, 0, newheight);
            } else if (newwidth && !newheight) {
                newwidth = parseInt(newwidth);
                checknewfile(filepath, newwidth, 0);
            } else {
                checknewfile(filepath, newwidth, newheight);
            }
        }
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
    finduserbyid: function (req, res) {
        var logindata = req.allParams();
        var printjson = function (data) {
            res.json(data);
        };
        User.finduserbyid(logindata, printjson);
    },
    findallusers: function (req, res) {
        var printjson = function (data) {
            res.json(data);
        };
        User.findallusers(req.body, printjson);
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