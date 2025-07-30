const { check, body } = require("express-validator");

const slugify = require("slugify");
const validatorMiddleware = require("../../middelwares/validatorMiddleware");

exports.getsubCategoryValidator = [
  check("id").isMongoId().withMessage("invalied"),
  validatorMiddleware,
];

exports.createsubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("pleas enter name")
    .isLength({ min: 3 })
    .withMessage("too short subCategory")
    .isLength({ max: 32 })
    .withMessage("to long subCategory")
   .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
  check("category").isMongoId().withMessage("invaild categort"),
  validatorMiddleware,
];

exports.updatesubCategoryValidator = [
  check("id").isMongoId().withMessage("invalied"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deletesubCategoryValidator = [
  check("id").isMongoId().withMessage("invalied"),
  validatorMiddleware,
];
