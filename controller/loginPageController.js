// Requiring The User Collection From Model/userMode ----------------------------->
const userCollection=require("../Model/userModel");
// Requiring The Bcrypt For Hashing The Password     ----------------------------->
const bcrypt=require("bcrypt"); 
// Requiring The JsonwebToken For creating The Token ----------------------------->
const jwt=require("jsonwebtoken");
// Requiring The SecretKey From The Config Folder    ----------------------------->
const config=require("../config/passwordSecretKey");
// Requiring The Cookie Module so you can use the Cookie-------------------------->
const cookie=require("cookie-parser");

// Controller For Handeling Login Page Post Request
exports.postLoginPage=async(req,res)=>{
    try {
        const loginNumber=req.body.number;
        const loginUserPassword=req.body.password;
        if(loginNumber!=="" && loginUserPassword!==""){
            // In The Case where The user has given all the Details
          let result=await userCollection.findOne({number:loginNumber});
          if(result!==null){
            // In The Case Where The user already Exists
           let passwordVerify=await bcrypt.compare(loginUserPassword,result.password);
           if(passwordVerify===true){
            // In The Case The password is matching ---------------------->
            console.log(result);
            // Creating The Token and Sending it---------------------------------->
            let token=jwt.sign({id:result._id},config.secretKey,{expiresIn:"2h"});
            // Sending The Cookie as Response -------------------------------------------------->
            res.cookie("LoginCookie",token,{expires:new Date(Date.now()+300000)});
            
            res.send({msg:"Login Successfull",status:200,userName:result.name,token:token,notesData:result.notesArray});
           }else{
            // In The Case The Password is not Matching--------------------->
            res.send({msg:"Kindly Check Your Password",status:403});
           }
          }else{
            // In The Case Where The user do not Exists 
            res.send({msg:"Kindly Signup Before Login",status:400})
          }
        }else{
            // In The Case where The User has not given all the details
            res.send({msg:"Kindly Provide The Details",status:204})
        }
    } catch (error) {
        console.log(error);
        res.send({msg:"There is a Server Error",status:500})
    }
};


