var express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/app/upload/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
const cors=require('cors');
;
var routes = require('./public/app/controllers/routes');
const todo = require('./public/app/models/todo');
const Tesseract = require("tesseract.js");

var app = express();
var http=require('http').Server(app);
app.use(express.static('./public/app/upload'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(cors())

app.post('/image', upload.single('image'), function(req, res, next) {

    Tesseract.recognize(
        "public/app/upload/"+req.file.originalname,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);

        res.json({
            text: text, image: 'public/app/upload/' + req.file.originalname,
        })
    }).catch(err=>res.json({
        text:err,image: 'public/app/upload/' + req.file.originalname,
    }))
});
// Set Views




routes.configure(app);
//app.listen();






console.log(3000);

//pass a http.Server instance
http.listen(3000);
/*var server = app.listen(8000, function(){



  console.log('Server listening on port ' + server.address().port);
});*/
