
const categoryModel= require("../models/catgeroyModel")
const asyncHandler = require('express-async-handler')
const ApiError=require("../utils/apiError")
const factory=require("./handelerFactor")
const multer  = require('multer')
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage}=require("../middelwares/uploadimage,midderlware")

//const multerStorge=multer.diskStorage({
  //destination:function(req,file,cb){
    //cb(null,"uploads/categories")

  //},
//filename:function(req,file,cb){
  //const ext=file.mimetype.split('/')[1]
  //const filename=`category-${uuidv4()}-${Date.now()}.${ext}`
  //cb(null,filename)
//}

//})


 exports.uploadCategoryImage=uploadSingleImage("Image")

exports.resizeImage=asyncHandler(async(req,res,next)=>{
  const filename=`category-${uuidv4()}-${Date.now()}.jpeg`

if(req.file){
  sharp(req.file.buffer).resize(600,600).toFormat("jpeg").jpeg({quality:90}).toFile(`uploads/categories/${filename}`)

req.body.Image=filename
}

next()
})



//@desc  get category
//@ route  get
//@ acess public
exports. getCategories= factory.getmany(categoryModel)

//@desc  get category by id 

exports. getCategory=factory.getone(categoryModel)



//@desc  creat category
//@ route  post
//@ acess private
exports.creatCategory= factory.createone(categoryModel)
 

//@desc  update category
exports.updateCategory=factory.upadteone(categoryModel)

//@desc  delet category
exports.deletCategory=factory.deletone(categoryModel)