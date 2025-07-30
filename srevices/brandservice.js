const Brand= require("../models/brandmodel")
const asyncHandler = require('express-async-handler')
const factory=require("./handelerFactor")
const ApiError=require("../utils/apiError")
const multer  = require('multer')
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage}=require("../middelwares/uploadimage,midderlware")


exports.uploadBrandImage=uploadSingleImage("image")

exports.resizeImage=asyncHandler(async(req,res,next)=>{
  const filename=`brand-${uuidv4()}-${Date.now()}.jpeg`
sharp(req.file.buffer).resize(600,600).toFormat("jpeg").jpeg({quality:90}).toFile(`uploads/brands/${filename}`)

req.body.Image=filename
next()
})

//@desc  get category
//@ route  get
//@ acess public
exports. getBrands=factory.getmany(Brand)

//@desc  get category by id 

exports. getBrand=factory.getone(Brand)



//@desc  creat category
//@ route  post
//@ acess private
exports.creatBrand=factory.createone(Brand)

//.then(category=>
//.catch(err=>res.status(400).send(err))

   // const newCategory =new categoryModel({name})

   // newCategory.save()
   // .then((doc)=>{
   //     res.json(doc)
   // })
   // .catch((err)=>{
//res.json(err)
 //   })




//@desc  update category
exports.updateBrand=factory.upadteone(Brand)
//@desc  delet category
exports.deletBrand=factory.deletone(Brand)