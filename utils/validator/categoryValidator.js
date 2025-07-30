const { check,body } = require('express-validator');
const slugify = require("slugify");


const validatorMiddleware=require('../../middelwares/validatorMiddleware')

exports.getCategoryValidator=[
    check("id").isMongoId().withMessage("invalied"),
    validatorMiddleware,
]

exports.createCategoryValidator=[
    check("name").notEmpty().withMessage("pleas enter name")
    .isLength({min:3})
    .withMessage('too short category')
    .isLength({max:32})
    .withMessage("to long category")
    .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
    validatorMiddleware   
]

exports.updateCategoryValidator=[
    check("id").isMongoId().withMessage("invalied"),
    body("name").optional().custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
    validatorMiddleware,
]


exports.deleteCategoryValidator=[
    check("id").isMongoId().withMessage("invalied"),
    validatorMiddleware,
]
