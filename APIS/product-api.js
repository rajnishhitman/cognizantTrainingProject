//create mini express app
const exp = require('express')
const productApi = exp.Router();
const expressErrorHandler = require("express-async-handler");
const multerObj = require("./middlewares/addfile")

// //import cloudinary related modules
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const {CloudinaryStorage} = require("multer-storage-cloudinary")



// //configure cloudinary
// cloudinary.config({
//     cloud_name: 'cognizanttraining',
//     api_key: '461465923565863',
//     api_secret: 'rTsakEbJFWkuc7nMaJCwU1NWys8'
// });
// //configure cloudinary storage
// const clStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         return {
//             folder: 'Training-products',
//             public_key: file.fieldname + '-' + Date.now()
//         }
//     }
// })
// //configure multer
// const multerObj=multer({storage: clStorage})




//body parsing middleware
// express.json() is a middleware to recognize the incoming Request Object as a JSON Object
productApi.use(exp.json())


// //import mongo client
// const mongoClient = require("mongodb").MongoClient;


// //db connection url
// const dburl = "mongodb+srv://cognizantTraining:cognizantTraining@cluster0.jkagd.mongodb.net/cognizantTraining?retryWrites=true&w=majority"


// //product collection object
// let productcollectionObject;

// //connect with mongo server
// mongoClient.connect(dburl, {useNewUrlParser:true,useUnifiedTopology:true}, (err,client)=>{

//     if(err){
//         console.log("err in db connect",err)
//     }
//     else{
//         productcollectionObject=client.db("cognizantTraining").collection("productcollection")
//         console.log("Product DB connection success")
//     }
// })






//create product
productApi.post("/createproduct", multerObj.single('photo'), expressErrorHandler(async(req,res,next) =>{
    let productcollectionObject = req.app.get("productcollectionObject")
    //get product obj
    let newPro = JSON.parse(req.body.productObj); 
    
    //search for existing product
    let product = await productcollectionObject.findOne({model:newPro.model})

    //if product is existed
    if(product!==null){
        res.send({message:"product of this model already existed"})
    }
    else{
        //add CDN link of image
        newPro.Image = req.file.path;
        //insert user
        await productcollectionObject.insertOne(newPro)
        res.send({message: "Product Added"})
    }
}))


//read all products
productApi.get("/getproducts", expressErrorHandler(async(req,res,next) =>{

    let productcollectionObject = req.app.get("productcollectionObject")

    let productsList = await productcollectionObject.find().toArray();
    res.send({message: productsList})

}))




//read product by name
productApi.get("/getproduct/:name",(req,res,next)=>{
    let productcollectionObject = req.app.get("productcollectionObject")
    //get productname from url params
    let un = req.params.name;

    //search
    productcollectionObject.findOne({name:un})
        .then(productObj=>{
            if(productObj == null){
                res.send({message: "product not existed"})
            }
            else{
                res.send({message: productObj})
            }
        })
        .catch(err => {
            console.log("err in reading product", err)
            res.send({message: err.message})
        })
})






//update product
productApi.put("/updateproduct/:productname",(req,res,next)=>{
    let productcollectionObject = req.app.get("productcollectionObject")
    //get productname from url params
    let uN = req.params.productname;

    let modifiedproduct = req.body;
    productcollectionObject.findOne({name: uN})
        .then(productObj =>{
            if(productObj == null){
                res.send({message: "product not existed for update"})
            } 
            else{
                productcollectionObject.updateOne({name:uN},
                    {$set:{
                        name:modifiedproduct.name,
                        price:modifiedproduct.price
                    }})
                    .then((success)=>{
                        res.send({message: "product updated"})
                    })
                    .catch(err => res.send(err.message))
            }
        })
})




//delete product
productApi.delete("/deleteproduct/:productname",(req,res,next)=>{
    let productcollectionObject = req.app.get("productcollectionObject")
    //get productname from url params
    let uN = req.params.productname;
    productcollectionObject.findOne({name: uN})
        .then(productObj =>{
            if(productObj == null){
                res.send({message: "product not existed to delete"})
            } 
            else{
                productcollectionObject.deleteOne({name:uN})
                    .then((success)=>{
                        res.send({message: "product deleted"})
                    })
                    .catch(err => res.send(err.message))
            }
        })
})



module.exports = productApi;