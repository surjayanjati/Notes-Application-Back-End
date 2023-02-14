// Requiring The Collection From The Model of Users Database

const userCollection=require("../Model/userModel");



// Signup Page Controller for Post request in the Signup Page

exports.postSignupPage=async(req,res)=>{
     try {
      
      
        const userName=req.body.name;
        const userNumber=req.body.number;
        
        const userPassword=req.body.password;
        if(userName!=="" && userNumber !=="" && userPassword !==""){
            //     In the Case Where the User has given all the details
         const userData=new userCollection({
            name:userName,
            number:userNumber,
            password:userPassword,
            notesArray:[]
         });
         // Saving The Data in The Collection 
         const result= await userData.save();
         if(result!=null){
            res.send({msg:"Signup Successfull",status:200});
         }else{
            res.send({msg:"Creation of new User Failed",status:500})
         }
        
        }else{                     // In the case Where the User has not given all the details
   res.send({msg:"Kindly Fill all the Details",status:204})
        }
     } catch (error) {
        
        res.send({msg:"Creation of new User Failed",status:500})
     }
}