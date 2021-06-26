// create express app
const exp = require('express');
const app = exp();
const path = require("path")
require('dotenv').config()

//connecting built of react with current server
app.use(exp.static(path.join(__dirname, './build/')))

//import apis
const userApi = require("./APIS/user-api")
const productApi = require("./APIS/product-api")
const adminApi = require("./APIS/admin-api")


//execute specific api based on path
app.use('/user', userApi)
app.use('/admin', adminApi)
app.use('/product', productApi)


//import mongo client
const mongoClient = require("mongodb").MongoClient;

//db connectivity
//db connection url
const dburl = process.env.DATABASE_URL;


//database obj

//connect with mongo server
mongoClient.connect(dburl, {useNewUrlParser:true,useUnifiedTopology:true}, (err,client)=>{

    if(err){
        console.log("err in db connect",err)
    }
    else{
        let databaseObject = client.db("cognizantTraining")
        let usercollectionObject=databaseObject.collection("usercollection")
        let admincollectionObject=databaseObject.collection("admincollection")
        let productcollectionObject=databaseObject.collection("productcollection")
        let usercartcollectionObject=databaseObject.collection("usercartcollection")
        

        //sharing collection object
        app.set("usercollectionObject", usercollectionObject)
        app.set("admincollectionObject", admincollectionObject)
        app.set("productcollectionObject", productcollectionObject)
        app.set("usercartcollectionObject", usercartcollectionObject)


        console.log("DB connection success")
    }
})







//This will handle the page refresh problem
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
    })


//handle invalid path
app.use((req,res,next) => {
    res.send({ message: `path ${req.url} is invalid` })
})

//handle errors
app.use((err, req, res, next) =>{
    console.log(err)
    res.send({ message:err.message })
})



//assign port 
const port = process.env.PORT||8080;
app.listen(port, () => console.log(`server listening on port ${port}..`))