const express = require("express");

const {
  creatSubCategory,
  getsubCategories,
  getsubCategory,
  deletSubCategory,
  updateSubCategory,
  setCategoryIdtoBody
} = require("../srevices/subCategoryService");
const {
  createsubCategoryValidator,
  getsubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator
} = require("../utils/validator/subcategoryValidator ");
const Authsercice=require("../srevices/auth")

const router = express.Router({mergeParams:true});

router
  .route("/")
  .post(Authsercice.protect,Authsercice.allowedTO("admin","manger"),setCategoryIdtoBody,createsubCategoryValidator, creatSubCategory)
  .get(getsubCategories);

router.route("/:id").get(getsubCategoryValidator, getsubCategory).put(Authsercice.protect,Authsercice.allowedTO("admin","manger"),updatesubCategoryValidator,updateSubCategory).delete(Authsercice.protect,Authsercice.allowedTO("admin","manger"),deletesubCategoryValidator,deletSubCategory);

module.exports = router;
