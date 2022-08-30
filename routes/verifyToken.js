const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization ;
    
    if(authHeader){
        jwt.verify(authHeader.split(' ')[1],process.env.JWT_SEC, (error,user)=>{
            if(error) res.status(403).json('token is not valid');
            req.user = user;
            next();
        });
    }
    else{
        return res.status(401).json('you are not authenticated');
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,()=>{
            next();
    });
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json('you are not allowed to do that');
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };