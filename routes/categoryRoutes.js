const express = require("express");

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");

const {
  getCategories,
  creatCategory,
  getCategory,
  updateCategory,
  deletCategory,uploadCategoryImage,resizeImage
} = require("../srevices/categoryServices");

const Authsercice=require("../srevices/auth")


const subcategoryRoute = require("./subCategoryRoutes");
const router = express.Router();
router.use("/:categoryId/subcategory", subcategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadCategoryImage,resizeImage,createCategoryValidator, creatCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadCategoryImage,resizeImage,updateCategoryValidator, updateCategory)
  .delete(Authsercice.protect,Authsercice.allowedTO("admin","manger"),deleteCategoryValidator, deletCategory);

module.exports = router;
