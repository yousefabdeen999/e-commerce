
const SubCategory = require("../models/sybcaregorymodel");
const factory=require("./handelerFactor")


exports.setCategoryIdtoBody=(req,res,next)=>{
    if(!req.body.category) req.body.category=req.params.categoryId
    next()
}
//@desc  creat category
//@ route  post
//@ acess private
exports.creatSubCategory = factory.createone(SubCategory)

exports.getsubCategories = factory.getmany(SubCategory)

//@desc  get category by id

exports.getsubCategory =factory.getone(SubCategory)

exports.updateSubCategory = factory.upadteone(SubCategory)
  

//@desc  delet category
exports.deletSubCategory = factory.deletone(SubCategory)
