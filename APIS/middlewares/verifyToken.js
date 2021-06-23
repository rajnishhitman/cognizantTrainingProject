const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {

    try{
        let token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'abcdef')
        console.log(token)
        next()
    }
    catch(err){
        res.send({message: err.message})
        // res.send({message: "AuthenticationError"})
    }

}

module.exports = checkToken;