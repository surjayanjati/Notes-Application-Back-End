// Requiring The JsonwebToken -------------------------------------------->
const jwt=require("jsonwebtoken");
// Requring The Secret Key From The Config Folder
const config=require("../config/passwordSecretKey");

// Function For Verifying The User while using The Token
const verifyToken=(req,res,next)=>{
    try {
        const token=req.headers['access-token'];
        console.log(`this is the token :${token}`);
        // In The Case The Token is Present
        if(token!==undefined && token!==""){
          
           // Verifying The Token with Jsonwebtoken
          jwt.verify(token,config.secretKey,(err,decode)=>{
            if(err){
                return   res.send({msg:"Kindly Authenticate Yourself",status:401});
            }
            req.currentUserId=decode.id;
            next();
          })
        }else{
            console.log("hi");
            // In The Case Where There is No Token inside Headers
            res.send({msg:"Kindly Authenticate Yourself",status:401})
        }
        
    } catch (error) {
        
        res.send({msg:"Internal Server Error",status:500});
        next();
    }
}





// Exporting The Middlewear Functions
module.exports={
    authToken:verifyToken
}