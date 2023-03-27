const jwt = require("jsonwebtoken");
const { client } = require("../db");

const authorization = (req,res,next)=>{
    const token = req.cookies.token || "sdffds45";
    
    jwt.verify(token, 'token', async (err, decoded) => {
        try {
            if(err){
                res.send({"msg":"Please Login"});
                return;
            }

            if(decoded){
                let chk = await client.exists(`${decoded.email}`);
    
                if(chk){
                    let blacklist = await client.get(`${decoded.email}`);
                    if(token == blacklist){
                        res.send({"msg":"Please Login"});
        
                    } else {
                        req.body.email = decoded.email;
                        next();
                    }
    
                } else {
                    req.body.email = decoded.email;
                    next();
                }
                
            } else {
                res.send({"msg":"Please Login"});
            }
            
        } catch (error) {
            console.log(error);
            res.status(400).send({"ok":false, "msg":"Something went wrong with middleware"})
        }
    });
}

module.exports = {
    authorization
}