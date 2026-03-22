
const jwt = require("jsonwebtoken");
require("dotenv").config();
const admin_token_verify  =(req,res,next)=>{
    const token = req.cookies.token;
    console.log("cookies:", req.cookies);
    if(!token){
        return res.status(401).send("no token");
        //redirect to login page later
    }
    
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"session expired"
            //redirect to login page in frontend job --->>> impp
        })
    }
    
}
const admin_Only = (req, res, next)=>{

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Access denied"
    });
 //based on response redirect to login page throih frontend
  }

  next();
}
module.exports = {
    admin_token_verify,
    admin_Only
}