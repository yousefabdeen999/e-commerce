const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        trime:true,
        required:[true,"name requried"]
    },
slug:{
    type:String,
    lowercase:true,
},
email:{
    type:String,
    required:[true,"email requried"],
    unique: true,
    lowercase:true,

},
phone:String,
profileImg:String,
password:{
    type:String,
    required:[true,"email requried"],
minlength:[6,"too short password"]
},
passwordChangeAt:Date,
passwordResetCode:String,
passwordResetExpires:Date,
passwordResetVerified:Boolean,
role:{
    type:String,
enum:["user","admin","manger"],
default:"user",
},
active:{
    type:Boolean,
    default:true,
}

},
{timestamps:true}
)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
const User=mongoose.model("User",userSchema)
module.exports=User