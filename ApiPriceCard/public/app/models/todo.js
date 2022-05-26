var express = require("express");
const axios = require('axios');
const reader = require('xlsx');
function Todo() {
    function formatAMPM(date) { // This is to display 12 hour format like you asked
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconde=date.getSeconds();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;

        let strTime = hours + minutes + ' ' +seconde+" "+ampm;
        return strTime;
    }

    function heureFormat(){
        let myDate = new Date();
        let displayDate = (myDate.getMonth() +myDate.getDate()+myDate.getFullYear()+ ' ' +formatAMPM(myDate)).replace(/[ ]/g, "");
        return displayDate;
    }
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    this.apiExcel=function (req,res2){
            axios
                .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
                .then(async (res) => {
                    let listItem = [];
                    let listItem2 = [];
                    listItem = res.data.data.map((item) => {
                        return item.card_prices[0]
                    })
                    listItem2 = res.data.data.map((item) => {
                        return {name:item.name, price:item.card_prices[0].cardmarket_price, date:new Date()+""};
                    })
                    await console.log(`statusCode: ${res.status}`);
                    // await console.log(res.data);
                    const file = await reader.readFile('C:/Users/kriss/IdeaProjects/priceapicard/ApiPriceCard/public/app/excel/test.xlsx');


                    ;


                    await console.log(listItem);

                    //const ws = await reader.utils.json_to_sheet(listItem);
                    const ws2=await reader.utils.json_to_sheet(listItem2);

                    //await reader.utils.book_append_sheet(file, ws, "price"+new DateHeure().heureFormat())
                    await reader.utils.book_append_sheet(file, ws2, heureFormat().substr(0,20))
// Writing to our file
             
                    await reader.writeFile(file, 'C:/Users/kriss/IdeaProjects/priceapicard/ApiPriceCard/public/app/excel/test.xlsx');
                    res2.send({
                        status: true,
                        message: 'file ok'
                    });
                }).catch((error) => {

                    console.error(error);
                    res.send({
                        status: false,
                        message: 'error'
                    });
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
