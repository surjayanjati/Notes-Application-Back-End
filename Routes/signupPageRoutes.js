// Requiring The Controllers For Signup Pages  From The Controller/signuppagecontroller
const signupPage=require("../controller/signupPageController")





module.exports=(app)=>{

    // Post Request For Signup Page Request------------------------------------->
    app.post("/curdapp/api/v1/users/signupusers",signupPage.postSignupPage )


}