// Requiring The Controller For Notes Page From controller/notesPageController
const notesPageController=require("../controller/notesPageController");
// Requiring The Middlewear For Checking Whether The User is authenticated or not
const tokenAuthentication=require("../middleware/tokenAuthentication");





module.exports=(app)=>{

    // Api For Handeling The Get Request For Notes Page
    app.get("/curdapp/api/v1/users/notesusers",tokenAuthentication.authToken, notesPageController.getNotesPage);

    // Api For Handeling The Post Request For Notes Page
    app.post("/curdapp/api/v1/users/notesusers",tokenAuthentication.authToken, notesPageController.postNotesPage);

    
    // Api For Handeling The Delete Request For Notes Page
    app.delete("/curdapp/api/v1/users/notesusers",tokenAuthentication.authToken, notesPageController.deleteNotesPage);

    
    // Api For Handeling The Update Request For Notes Page
    app.put("/curdapp/api/v1/users/notesusers",tokenAuthentication.authToken, notesPageController.updateNotesPage);
}