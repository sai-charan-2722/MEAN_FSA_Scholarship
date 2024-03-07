const jwt=require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
    //token verification logic
        //get bearer token from headers of req object
        const bearerToken=req.headers.authorization;
        //get token
        if(bearerToken){
        const token=bearerToken.split(' ')[1]
        //verify the token
        let decodedToken=jwt.verify(token,process.env.SECRET_KEY)
        next()

        }else{
            res.status(200).send({message:"Unauthorised access"})
        }

}


module.exports=verifyToken;