const JWT_SCRECT = require("../config.js")
const jwt = require("jsonwebtoken");

const jwtverification = (req,res,next)=>{
    //console.log(req.headers.authentication);
    if(!req.headers.authentication || !req.headers.authentication.startsWith("Bearer"))
    {
        return res.status(411).json({
            message:"invalid token",
        });
    }
    const token = req.headers.authentication.split(" ")[1];
    try {
        const decode = jwt.verify(token,JWT_SCRECT);
        req.username = decode.username;
        req.userid = decode.userid;
        next();
    } catch (error) {
        return res.status(411).json({
            message:"invalid user token",
        })
    }  
}
module.exports = jwtverification;