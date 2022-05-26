var todo = require('../models/todo');
let fileupload = require("express-fileupload");
module.exports = {
//
  configure: function(app) {
    
    app.post("/AjoutPhoto", fileupload(), function (req, res) {
      todo.uploadPicture(
          req,
          res
      );
    })
  }
};
