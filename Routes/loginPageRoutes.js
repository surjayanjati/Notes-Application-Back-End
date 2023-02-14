// Requiring The LoginPage Controller From the Controller/loginPageController-------------------->
const loginPageController=require("../controller/loginPageController");






// All The Routes For Login Page -------------------------------->
module.exports=(app)=>{

    // Api For Handeling Login Page Post Request
    app.post("/curdapp/api/v1/users/loginusers",loginPageController.postLoginPage)
}