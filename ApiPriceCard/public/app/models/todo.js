var express = require("express");




function Todo() {
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    this.uploadPicture = function (req, res) {
        console.log("test");
        try {
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let avatar = req.files.avatar;

                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                avatar.mv('./public/app/upload/' + avatar.name);

                //send response
                res.send({
                    status: true,
                    message: 'File uploaded'
                });

            }
        } catch (err) {
            res.status(500).send(err);
        }
    };

    
    
}

module.exports = new Todo();
