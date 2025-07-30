const express = require("express");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validator/Brandvalidation");

const {
  getBrands,
  getBrand,
  creatBrand,
  updateBrand,
  deletBrand,uploadBrandImage,resizeImage
} = require("../srevices/brandservice");
const Authsercice=require("../srevices/auth")
const router = express.Router();

router.route("/").get(getBrands).post(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadBrandImage,resizeImage,createBrandValidator, creatBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadBrandImage,resizeImage,updateBrandValidator, updateBrand)
  .delete(Authsercice.protect,Authsercice.allowedTO("admin","manger"),deleteBrandValidator, deletBrand);

module.exports = router;
