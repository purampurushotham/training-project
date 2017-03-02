/**
 * Created by purushotham on 1/3/17.
 */
var product = require("./models/ProductModel");
var assert = require('assert')
var comment = require("./models/CommentModel");
var mongoose = require('mongoose')
var path =require("path")
var fs = require("fs");
mongoose.connect('mongodb://localhost/myShoppingCart')

console.log("\n *STARTING* \n");
// Get content from file
console.log(__dirname)
var s=path.join(__dirname, '../client/data.json');
var contents = fs.readFileSync(s);
// Define to JSON type
var jsonContent = JSON.parse(contents);
// Get Value from JSON
var productsList =[];
var commentsList = [];
for (var i=0;i<jsonContent.length;i++) {

    var j = jsonContent[i];
    for (key in j) {
        if (key === "comments"){
            commentsList.push(j.id, j.comments);
            delete j['comments']
        }
    }
    productsList.push(j)

}
//insertComments(commentsList)
//console.log(productsList.length)
insertProducts(productsList);
function  insertProducts(productsList) {
    console.log(productsList.length)
    for(var i =0; i < productsList.length;i++) {
        var eachProd = productsList[i];
        var p = new product();
        p.product_id = eachProd.id;
        p.name = eachProd.name;
        p.price = eachProd.price;
        p.type = eachProd.type;
        p.subType = eachProd.subType;
        for (k in eachProd.camera) {
            console.log("$$$$$$$$$$$$$$$$$$$$");
            console.log(k)
            p.cam.push(k);
        }
        eachProd.offers.forEach(function (eachoffer) {
            p.offers.push(eachoffer)

        });
        p.rating = eachProd.rating;

        p.language = eachProd.language;
        p.author = eachProd.author;
        p.brand = eachProd.brand;
        p.color = eachProd.color;
        p.model_Name = eachProd.model_name;
        p.battery = eachProd.battery;
        p.rom = eachProd.rom;
        p.ram = eachProd.ram;
        p.pic.data=eachProd.pic
        p.pic.contentType="image/jpg";
        console.log(eachProd);

        p.save(function (error, data) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
            }
        });
    }
}
/*

function insertComments(commentsList) {
    console.log(commentsList);
    for (var i = 0; i < commentsList.length; i++) {
        var eachobject = commentsList[i];
        /!*var c =new comment();
         c.product_id=eachobject.pro*!/
    }
    console.log("\n *EXIT* \n");
}

*/

