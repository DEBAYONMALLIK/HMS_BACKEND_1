const jwt = require("jsonwebtoken");
const auth=require("../configs/auth.config");

function verifyToken(req,res,next){
//  const token=req.headers["x-access-tokens"];

// const token=req.headers["authorization"];

// const token = req.cookies.token; // now it will take from cookies

// now it will work both wuit header and cookies 
  let token = req.headers["authorization"];

  // If not found, check in cookies
  if (!token && req.cookies) {
    token = req.cookies.token;
  }


if(!token) return res.status(403).send({ message: "No token provided!" });

jwt.verify(token,auth.secrete,(err,decoded)=>{

    if(err){
      console.log("user is not authorized")
      return res.status(401).send({ message: "Unauthorized!" });}

    req.email=decoded.email;
    req.userId=decoded._id;
    req.role=decoded.role;

    next();
})



}
module.exports={
    verifyToken
}