//create mini express app
const exp = require('express')
const userApi = exp.Router();
const expressErrorHandler = require("express-async-handler");
const multerObj = require("./middlewares/addfile")
require('dotenv').config()

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

// //config cloudinary storage
// const clStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async(req, file) =>  {
//         return(
//             folder: 'Training',
//             public_key: file.fieldname + '-' + Date.now()
//         )
//     }
// })


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
//             folder: 'Training',
//             public_key: file.fieldname + '-' + Date.now()
//         }
//     }
// })
// //configure multer
// const multerObj=multer({storage: clStorage})



const checkToken = require("./middlewares/verifyToken")

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


// userApi.get('/getusers', (req,res)=>{
//     res.send("user api working")
// })



//body parsing middleware
// express.json() is a middleware to recognize the incoming Request Object as a JSON Object
userApi.use(exp.json())


// //import mongo client
// const mongoClient = require("mongodb").MongoClient;


// //db connection url
// const dburl = "mongodb+srv://cognizantTraining:cognizantTraining@cluster0.jkagd.mongodb.net/cognizantTraining?retryWrites=true&w=majority"


// //database obj
// // let userObject;

// //usercollection object
// let usercollectionObject;

// //connect with mongo server
// mongoClient.connect(dburl, {useNewUrlParser:true,useUnifiedTopology:true}, (err,client)=>{

//     if(err){
//         console.log("err in db connect",err)
//     }
//     else{
//         usercollectionObject=client.db("cognizantTraining").collection("usercollection")
//         console.log("Users DB connection success")
//     }
// })









//create new user
// userApi.post('/createuser', (req,res,next)=>{

//     let newUser = req.body;

//     //save it to db
//     databaseObject.collection("usercollection").insertOne(newUser, (err,success)=>{
//         if(err){
//             console.log("err in usercreation", err)
//         }
//         else{
//             res.send({message:"usercreated"})
//         }
//     })
// })



//create new user
// userApi.post('/createuser', (req,res,next)=>{
//     //get user object
//     let newUser = req.body;

//     //check username is already existed
//     databaseObject.collection("usercollection").findOne({username:newUser.username}, (err, userObj)=>{
//         if(err){
//             console.log("err in reading one user", err)
//         }

//         //if user is existed
//         if(userObj!==null){
//             res.send({message:"user already existed"})
//         }
//         //if user is not existed
//         else{
//             //insert user
//             databaseObject.collection("usercollection").insertOne(newUser,(err,success)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     res.send({message:"User crreated"})
//                 }
//             })
//         }
//     })
// })



//create user by promises
// userApi.post("/createuser", (req,res,next) =>{
//     //get user obj
//     let newUser = req.body;
    
//     //search for existing user
//     usercollectionObject.findOne({username:newUser.username})
//         .then(user=>{
//             //if user is existed
//             if(user !== null){
//                 res.send({message:"user already existed"})
//             }
//             else{
//                 usercollectionObject.insertOne(newUser)
//                     .then((success)=>{
//                         res.send({message: "User created"})
//                     })
//                     .catch(err => res.send(err.message))
//             }
//         })
// })


//create user by async await
userApi.post("/createuser", multerObj.single('photo'), expressErrorHandler(async(req,res,next) =>{
    let usercollectionObject = req.app.get("usercollectionObject")
    //get user obj
    //Use the JavaScript function JSON.parse() to convert text into a JavaScript object
    let newUser = JSON.parse(req.body.userObj); 

    //search for user
    let user = await usercollectionObject.findOne({username:newUser.username})

    //if user is existed
    if(user!==null){
        res.send({message:"user already existed"})
    }
    else{
        //hash the password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace plain pw with hashedPassword
        newUser.password = hashedPassword;
        //add CDN link of image
        newUser.profileImage = req.file.path;
        //insert user
        await usercollectionObject.insertOne(newUser)
        res.send({message: "User created"})
    }

}))




//read all users
// userApi.get('/getusers', (req,res,next)=>{
    
//     //read all users
//     databaseObject.collection('usercollection').find().toArray((err,usersList)=>{
//         if(err){
//             console.log("err in reading users",err)
//             res.send({message: err.message})
//         }
//         else{
//             res.send({message: usersList})
//         }
//     })

// })



//read all users using promise
// userApi.get("/getusers", (req,res,next) =>{
//     usercollectionObject.find().toArray()
//         .then(usersList =>{
//             res.send({message:usersList})
//         })
//         .catch(err =>{
//             console.log("err in reading user", err)
//             res.send({message: err.message})
//         })
// })


//read all users using async await
userApi.get("/getusers",expressErrorHandler(async (req,res,next) =>{
    let usercollectionObject = req.app.get("usercollectionObject")

    let usersList = await usercollectionObject.find().toArray();
    res.send({message: usersList})
}))







// read user by username
// userApi.get("/getuser/:username",(req,res,next)=>{

//     //get username from url param
//     let un = req.params.username;

//     //search in collection
//     databaseObject.collection("usercollection").findOne({username:un}, (err,userObject)=>{
//         if(err){
//             console.log("err in reading one user", err)
//             res.send({message: err.message})
//         }
//         //when user not found
//         if(userObject==null){
//             res.send({message: "user not found"})
//         }
//         //if user existed
//         else{
//             res.send({message: un})
//         }
//     })
// })




//read user by username by promises
// userApi.get("/getuser/:username",(req,res,next)=>{
//     //get username from url params
//     let un = req.params.username;

//     //search
//     usercollectionObject.findOne({username:un})
//         .then(userObj=>{
//             if(userObj == null){
//                 res.send({message: "user not existed"})
//             }
//             else{
//                 res.send({message: userObj})
//             }
//         })
//         .catch(err => {
//             console.log("err in reading user", err)
//             res.send({message: err.message})
//         })
// })



//read user by username by asyn await
userApi.get("/getuser/:username", expressErrorHandler(async(req,res,next)=>{
    let usercollectionObject = req.app.get("usercollectionObject")
    //get username from url params
    let un=req.params.username;
    //search for user
    let user = await usercollectionObject.findOne({username:un})

    if(user==null){
        res.send({message: "user not existed"})
    }
    else{
        res.send({message: user})
    }
}))







//update user
// userApi.put("/updateuser/:username",(req,res,next)=>{

//     let modifiedUser = req.body;

//     //update
//     databaseObject.collection("usercollection").updateOne({username:modifiedUser.username},
//         {$set:{
//             email:modifiedUser.email,
//             age:modifiedUser.age,
//             city:modifiedUser.city
//         }}, (err,success)=>{
//             if(err){
//                 console.log("err in update",err)
//             }
//             else{
//                 res.send({message:"user updated"})
//             }
//         })
// })



//update user by promises
// userApi.put("/updateuser/:username",(req,res,next)=>{
//     //get username from url params
//     let uN = req.params.username;

//     let modifiedUser = req.body;
//     usercollectionObject.findOne({username: uN})
//         .then(userObj =>{
//             if(userObj == null){
//                 res.send({message: "user not existed for update"})
//             } 
//             else{
//                 usercollectionObject.updateOne({username:uN},
//                     {$set:{ ...modifiedUser
//                         // username:modifiedUser.username,
//                         // email:modifiedUser.email,
//                         // age:modifiedUser.age,
//                         // city:modifiedUser.city
//                     }})
//                     .then((success)=>{
//                         res.send({message: "User updated"})
//                     })
//                     .catch(err => res.send(err.message))
//             }
//         })
// })




//update user by async await
userApi.put("/updateuser/:username",expressErrorHandler(async(req,res,next)=>{
    let usercollectionObject = req.app.get("usercollectionObject")
    //get username from url params
    let uN = req.params.username;

    let modifiedUser = req.body;

    let userObj = await usercollectionObject.findOne({username: uN})
    if(userObj==null){
        res.send({message: "user not existed for update"})
    }
    else{
        await usercollectionObject.updateOne({username: uN}, {$set : {...modifiedUser}})
        res.send({message: "user updated"})
    }
}))




//delete user by promises
// userApi.delete("/deleteuser/:username",(req,res,next)=>{
//     //get username from url params
//     let uN = req.params.username;
//     usercollectionObject.findOne({username: uN})
//         .then(userObj =>{
//             if(userObj == null){
//                 res.send({message: "user not existed to delete"})
//             } 
//             else{
//                 usercollectionObject.deleteOne({username:uN})
//                     .then((success)=>{
//                         res.send({message: "User deleted"})
//                     })
//                     .catch(err => res.send(err.message))
//             }
//         })
// })





//delete user by promises
userApi.delete("/deleteuser/:username",expressErrorHandler(async(req,res,next)=>{
    let usercollectionObject = req.app.get("usercollectionObject")
    //get username from url params
    let uN = req.params.username;

    //find user
    let user=await usercollectionObject.findOne({username:uN})

    //if user not existed
    if(user == null){
        res.send({message: "user not existed"})
    }
    else{
        await usercollectionObject.deleteOne({username: uN})
        res.send({message: "user deleted"})
    }
}))




//user Login
userApi.post("/login",expressErrorHandler(async(req,res,next)=>{
    let usercollectionObject = req.app.get("usercollectionObject")
    let credentials = req.body;

    //verify username
    let user = await usercollectionObject.findOne({username:credentials.username})

    //if user is not existed
    if(user === null){
        res.send({message: "Invalid username"})
    }
    //if user is existed
    else{
        //compare password
        let result = await bcryptjs.compare(credentials.password, user.password)
        // console.log("result is", result)
        //if password not matched
        if(result === false){
            res.send({message: "Invalid password"})
        }
        //if password matched
        else{
            //create a token and send it as res
            let token = await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn:"20"})

            //remove password from user
            delete user.password; 
            
            // console.log("token is ",token)
            res.send({message: "login-success", token:token, username:credentials.username, userObj: user})
        }
    }
}))


//add to cart
userApi.post("/addtocart", expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObject = req.app.get("usercartcollectionObject")

    //get user cart obj
    let userCartObj = req.body;

    //find user in usercartcollection
    let userInCart = await userCartCollectionObject.findOne({username: userCartObj.username})

    //if user not existed in cart
    if(userInCart === null){
        //new usercartObject
        let products = [];
        products.push(userCartObj.productObj)
        let newUserCartObject = {username: userCartObj.username, products: products };

        console.log(newUserCartObject)
        //insert
        await userCartCollectionObject.insertOne(newUserCartObject)
        res.send({message: "Product added to cart"})
    }
    //if user already existed in cart
    else{

        userInCart.products.push(userCartObj.productObj)
        console.log(userInCart)

        //update
        await userCartCollectionObject.updateOne({username: userCartObj.username}, {$set:{...userInCart}})
        res.send({message: "Product added to cart"})
    }
}))






//protected route
userApi.get("/testing", checkToken,expressErrorHandler((req, res) => {

    res.send({message : "this is protected data"})
}))







module.exports = userApi;