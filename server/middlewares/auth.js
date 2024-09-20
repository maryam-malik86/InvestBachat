// Authentication , isStudent , isAdmin 

const jwt=require('jsonwebtoken')
require('dotenv').config();

exports.auth = (req,res,next) =>{
    try{
    const token=req.body.token || req.cookies.token || req.header('Authorization').replace('Bearer ','');
    if(!token){
            res.json({
                success:false,
                message:"Token is missing "
            })
        }


    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user=payload;

    }catch(error){
        res.json({
            error,
            message:"Token is invalid"
        })
    }
    next();
 }
    catch(error){

    }
}

exports.isMember= (req,res,next) => {
    try{
        if(req.user.role !== 'Member'){
            return res.status(401).json({
                success:true,
                message:"Members side "
            })
        }
        next();
    }catch(error){

    }
}

exports.isAdmin= (req,res,next) => {
    try{
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:true,
                message:"Only admin can access  "
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })
    }
}
