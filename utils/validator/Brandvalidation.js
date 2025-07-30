const { check, body } = require("express-validator");

const validatorMiddleware=require('../../middelwares/validatorMiddleware');
const { default: slugify } = require('slugify');

exports.getBrandValidator=[
    check("id").isMongoId().withMessage("invalied"),
    validatorMiddleware,
]

exports.createBrandValidator=[
    check("name").notEmpty().withMessage("pleas enter name")
    .isLength({min:3})
    .withMessage('too short Brand')
    .isLength({max:32})
    .withMessage("to long Brand")
   .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
    validatorMiddleware   
]

exports.updateBrandValidator=[
    check("id").isMongoId().withMessage("invalied"),
    body("name").optional().custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
    validatorMiddleware,
]


exports.deleteBrandValidator=[
    check("id").isMongoId().withMessage("invalied"),
    validatorMiddleware,
]
