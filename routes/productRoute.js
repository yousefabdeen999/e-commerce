const express = require("express");

const {
    creatProduct,
  getProductes,
  getproduct,
  updateProduct,
  deletProduct,uploadProductImages,resizeProductImages
  
} = require("../srevices/productservice");
const {
    createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator
} = require("../utils/validator/Productvalidation");
const Authsercice=require("../srevices/auth")

const router=express.Router()
router
  .route("/")
  .post(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadProductImages,resizeProductImages,createProductValidator, creatProduct)
  .get(getProductes);

router.route("/:id").get(getProductValidator, getproduct).put(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadProductImages,resizeProductImages,updateProductValidator,updateProduct).delete(Authsercice.protect,Authsercice.allowedTO("admin","manger"),deleteProductValidator,deletProduct);

module.exports = router;
