const User= require("../models/usermodel")
const asyncHandler = require('express-async-handler')
const factory=require("./handelerFactor")
const ApiError=require("../utils/apiError")
const multer  = require('multer')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage}=require("../middelwares/uploadimage,midderlware")


const createToken = (payload) =>
    jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
      expiresIn:process.env.JWT_EXPIRED_IN,
    });


exports.uploadUserImage=uploadSingleImage("profileImg")

exports.resizeImage=asyncHandler(async(req,res,next)=>{
  const filename=`User-${uuidv4()}-${Date.now()}.jpeg`

if(req.file){await sharp(req.file.buffer)
  .resize(600,600)
  .toFormat("jpeg").
  jpeg({quality:90}).
  toFile(`uploads/User/${filename}`)
  
  req.body.Image=filename

}
  
next()
})

//@desc  get User
//@ route  get
//@ acess public
exports. getUsers=factory.getmany(User)

//@desc  get User by id 

exports. getUser=factory.getone(User)



//@desc  creat User
//@ route  post
//@ acess private
exports.creatUser=factory.createone(User)

//.then(User=>
//.catch(err=>res.status(400).send(err))

   // const newCategory =new categoryModel({name})

   // newCategory.save()
   // .then((doc)=>{
   //     res.json(doc)
   // })
   // .catch((err)=>{
//res.json(err)
 //   })




//@desc  update User
exports.updateUser=asyncHandler(async(req,res,next)=>{
const document=await User.findByIdAndUpdate(req.params.id,{
  name:req.body.name,
  slug:req.body.slug,
  phone:req.body.phone,
  email:req.body.email,
  profileImg:req.body.profileImg,
  role:req.body.role,
},{
  new:true
})
if(!document){
return next(new ApiError(`no document fpr this id ${req.params.id} `,404))
}
res.status(200).json({data:document})

})



exports.changeUserPaswword=asyncHandler(async(req,res,next)=>{

  const document=await User.findByIdAndUpdate(req.params.id,{
   password:await bcrypt.hash(req.body.password,12),
   passwordChangeAt:Date.now()
  },{
    new:true
  })
  if(!document){
      res.status(404).json({msg:`no document find`})
  
  }
  res.status(200).json({data:document})
  })

exports.getloggeduserData=asyncHandler(async(req,res,next)=>{
  req.params.id = req.user._id;
  next();

})
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.user._id)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

exports.updateLoggedUserData=asyncHandler(async (req, res, next) => {
  const updatedUser=await User.findByIdAndUpdate(req.user._id,{
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
  },{
    new:true
  })
  res.status(200).json({data:updatedUser})
})


exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});








//@desc  delet User

exports.deletUser=factory.deletone(User)