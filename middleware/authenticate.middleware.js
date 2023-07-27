const jwt = require("jsonwebtoken");
const verify_token=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,"masai",(err,decode)=>{
            if(err){
                res.send({"message":"Please Login"})
            }else{
                req.body.authorId=decode._id
                next();
            }
        })
    }else{
        res.send({"message":"Please Login"})
    }
}
module.exports={
    verify_token
}