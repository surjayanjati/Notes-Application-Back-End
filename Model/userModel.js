//Requiring The Mongoose Model
const mongoose=require("mongoose");
// Requiring The Bcrypt Module For hasing The Password
const bcrypt=require("bcrypt");
// Requiring The Secret Key From The Config/passwordSecretKey File
const secreKey=require("../config/passwordSecretKey");

mongoose.set('strictQuery', true);

// Connecting With The Database Mongodb using Mongoose
mongoose.connect("mongodb://localhost/curdapp",()=>{
    console.log("Connection To Mongodb Database has been succesfull");
})

// Creating Schema For User Collection
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notesArray:[{
  notes:{
    type:String,
   
  },
  notesId:{
    type:String
    }
  
    }],
    
});

// Hasing The Password Before Saving The Data into the Collection
userSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,8);
  }
  next();
})
// Creating The Collection using model For users
module.exports =mongoose.model("users",userSchema);