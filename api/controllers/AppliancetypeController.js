/**
 * AppliancetypeController
 *
 * @description :: Server-side logic for managing appliancetypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    upload: function (req, res) {
        if (req.method === 'GET')
            return res.json({
                'status': 'GET not allowed'
            });
        //	Call to /upload via GET is error
        var id=req.param("id");
//        var file = req.file("uploadFile");
        console.log(id);
//        console.log(file);
//        console.log(req.body);
                var uploadFile = req.file("uploadFile");
                console.log(uploadFile);
                uploadFile.upload(function onUploadComplete(err, files) {
                    //	Files will be uploaded to .tmp/uploads
                    if (err) return res.serverError(err);
                    //	IF ERROR Return and send 500 error with error
                    //            console.log(files);
                    var printcallback = function (response) {
                        res.json(response);
                    }
                    Appliancetype.upload(req.body,files, printcallback);
                });
    }
};

