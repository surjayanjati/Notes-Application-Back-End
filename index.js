/// Requring The express Module
const express=require("express");
const app=express();
// Requiring The middlewear so you can use the Cookie
const cookie=require("cookie-parser");


// The middlewear for accepting the Json files
app.use(express.json());
// The Middlewear so you can use The Cookie------------>
app.use(cookie());


// Requiring The Routes From the Signup Page
require("./Routes/signupPageRoutes")(app)
// Requiring The Routes For The Login Page
require("./Routes/loginPageRoutes")(app);
// Requiring The Routes For The Notes Page
require("./Routes/notesPageRoutes")(app);














// Connecting to The Server with Port number
app.listen(7777,()=>{
    console.log("Connection has been succesfull");
})