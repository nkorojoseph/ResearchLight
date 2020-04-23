const jwt = require('jsonwebtoken')
const config = require('config')

//middleware function that has access to the req and res from the frontend to the server then back to the server

module.exports= function(req,res,next) {
    //Get token from header
    const token = req.header('x-auth-token')

    //check if not token
    if(!token){
        return res.status(401).json({message:"No token, please verify your details"})
    }
    //verify token
    try {
         const decoded = jwt.verify(token,config.get('jwtSecret'))
         
         req.user = decoded.user
         next()
    } catch (error) {
        res.status(401).json({message:"Invalid token sent"})
        
    }
}