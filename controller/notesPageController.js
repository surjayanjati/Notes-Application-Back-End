// Requiring The Collection For Notes Page From Model/notesModel
const notesCollection=require("../Model/notesModel");
const userCollection=require("../Model/userModel")




// Controller For Notes Page Handeling Notes Page Get Request  ------------------------------>
exports.getNotesPage=async(req,res)=>{
    try {
        // Storing The Id of current User From The middlewear
        let currentUserId=req.currentUserId;
        if(currentUserId!==undefined){
        // Finding The User Where he is There in The Database Or Not
        let findUserResult=await userCollection.findOne({_id:currentUserId});
        if(findUserResult){
            // IN The Case The User Is already There in The Database
          
          res.send({msg:"Welcome To Notes Page",status:200});
        }else{
            // In The Case The User Is not There in The Database
            res.send({msg:"Kindly Authenticate Yourself",status:401});
            
        }
        
        
        }else{
            // In The Case Where The User is not Authenticated
            res.send({msg:"Kindly Authenticate Yourself",status:401});
        }
    } catch (error) {
        
        res.send({msg:"Internal Server Error",status:500})
    }
}

// Controller For Handeling The Post Request For Notes Page---------------------------------->
exports.postNotesPage=async(req,res)=>{
    try {
        // Storing The Id of current User From The middlewear
        let currentUserId=req.currentUserId;
        if(currentUserId!==undefined){
            // In The Case Where The User Already Exists
            let userNotes=req.body.notes;
            let notesId=req.body.notesId;
         // Saving The Notes Inside The Database ------------------------------------->
         let postNotesResult=await userCollection.updateOne({_id:currentUserId},{$push:{notesArray:{notes:userNotes,notesId:notesId}}});
         if(postNotesResult.acknowledged===true){
            // In The Case Where The Notes Has been Pushed inside The Database
            res.send({msg:"The Note Has Been Saved",status:201});
         }else{
            // In The Case Where The Note was unable to Save inside the Database
            res.send({msg:"Unable To Save The Note",status:400});
         }
         
     

           
        }else{
            // In The Case Where The User is not Authenticated
            res.send({msg:"Session has Been expired,Login again",status:401});
        }
    } catch (error) {
        
        res.send({msg:"Internal Server Error",status:500})
    }
}




// Controller For Handeling The Delete Request For Notes Page---------------------------------->
exports.deleteNotesPage=async(req,res)=>{
    try {
        // Storing The Id of current User From The middlewear
        let currentUserId=req.currentUserId;
        if(currentUserId!==undefined){
            // In The Case Where The User Already Exists
          let deletingNotesId=req.body.notesId;
          let deleteNotesResult=await userCollection.updateOne({_id:currentUserId},{$pull:{notesArray:{notesId:deletingNotesId}}});
          if(deleteNotesResult.acknowledged===true){
            res.send({msg:"Notes Has Been Deleted",status:201});
          }else{
            // In The Case The Server is Unable To Delete The Notes
            res.send({msg:"Unable To Delete The Note",status:400});
          }
          
        }else{
            // In The Case Where The User is not Authenticated
            res.send({msg:"Kindly Authenticate Yourself",status:401});
        }
    } catch (error) {
        
        res.send({msg:"Internal Server Error",status:500})
    }
}

// Controller For Handeling The Update Request For Notes Page---------------------------------->
exports.updateNotesPage=async(req,res)=>{
    try {
        // Storing The Id of current User From The middlewear
        let currentUserId=req.currentUserId;
        if(currentUserId!==undefined){
            // In The Case Where The User Already Exists
         let updatingNotesId=req.body.notesId;
         let updatingNotesData=req.body.notesValue;
         // Updating The Notes Using The Notes Id And Notes Value
         let updatingResult=await userCollection.updateOne({_id:currentUserId,"notesArray.notesId":updatingNotesId},{$set:{"notesArray.$.notes":updatingNotesData}});
         if(updatingResult.acknowledged===true){
            // In The Case Where The Notes has been Successfully Updated
            res.send({msg:"Notes Has Updated",status:201});
         }else{
            // In ThE Case There is some error while updating The Notes
            res.send({msg:"Unable To Update The Note",status:400});
         }
          
        }else{
            // In The Case Where The User is not Authenticated
            res.send({msg:"Kindly Authenticate Yourself",status:401});
        }
    } catch (error) {
        console.log(error);
        res.send({msg:"Internal Server Error",status:500})
    }
}