const User= require("../models/usermodel")
const jwt = require('jsonwebtoken');
const crypto=require("crypto")
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');  

const ApiError = require("../utils/apiError");
const sendemail=require("../utils/sendemaio")



const createToken = (payload) =>
    jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
      expiresIn:process.env.JWT_EXPIRED_IN,
    });



exports.Signup=asyncHandler(async(req,res,next)=>{
const user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
})

const token = createToken(user._id);
res.status(201).json({data: user,token})

})

exports.Login=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})

    if(!user||!await (bcrypt.compare(req.body.password,user.password))){
        return next(new ApiError("incorect password or email", 401))
    }
    const token = createToken(user._id);
res.status(201).json({data: user,token})

})

exports.protect=asyncHandler(async(req,res,next)=>{
    // 1) Check if token exist, if exist get
    let token 
    if(
        req.headers.authorization&&
        req.headers.authorization.startsWith("Bearer")
    ){
        token=req.headers.authorization.split(" ")[1]

    }
    if(!token){
        return next(new ApiError("you are no login ,pleas login to acess ",401))
    }
  // 2) Verify token (no change happens, expired token)

const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)

  // 3) Check if user exists
const currentUser=await User.findById(decode.userId)
if(!currentUser){
    return next(new ApiError("the user that belong to this token does no longer exit",401))
}
if (currentUser.passwordChangeAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decode.iat) {
      return next(
        new ApiError(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();

})

exports.allowedTO=(...roles)=>asyncHandler(async(req,res,next)=>{
    if(!roles.includes(req.user.role)){
return next(new ApiError("you are not allowed to acess this route",403))
    }
    next()
})


exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
const resetCode=Math.floor(100000 + Math.random() * 900000).toString()
const hashresetCode=crypto.createHash("sha256").update(resetCode).digest("hex")

user.passwordResetCode=hashresetCode;
user.passwordResetExpires=Date.now()+10*60*1000;
user.passwordResetVerified=false;
user.save()



const message=`hi ${user.name},\nwe recived a require to reset password on e shop.\n${resetCode}`

try{await sendemail({email:user.email,
  subject:"your password rest code (valied for 10 min)",
message,})}catch(err){
  user.passwordResetCode=undefined
  user.passwordResetExpires=undefined
  user.passwordResetVerified=undefined
  await user.save()
  return next(new ApiError("there is an error in sending email",500))
}
res.status(200).json({status:"sucess",message:"reset code send to email"})
})

exports.verifyPassRestcode=asyncHandler(async(req,res,next)=>{
  const hashresetCode=crypto.createHash("sha256")
  .update(req.body.resetCode).
  digest("hex")

const user =await User.findOne({passwordResetCode:hashresetCode,
  
passwordResetExpires:{$gt:Date.now()}

});
if(!user){
  return next(new ApiError("reset code invailed"))
}
user.passwordResetVerified=true;
await user.save()
res.status(200).json({status:"sucess"})



})
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});