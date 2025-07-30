const { check, body } = require("express-validator");

const validatorMiddleware=require('../../middelwares/validatorMiddleware');
const { default: slugify } = require('slugify');
const User = require("../../models/usermodel");
const bcrypt = require('bcryptjs');

exports.getUserValidator=[
    check("id").isMongoId().withMessage("invalied"),
    validatorMiddleware,
]

exports.createUserValidator=[
check("name")
.notEmpty().withMessage("pleas enter name")
    .isLength({min:3})
    .withMessage('too short User')
    .isLength({max:32})
    .withMessage("to long Brand")
   .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
    check("email").notEmpty()
    .withMessage("email required")
    .isEmail()
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error('E-mail already in user'));
          }
        })
      ),
      check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
          throw new Error('Password Confirmation incorrect');
        }
        return true;
      }),
  
    check('passwordConfirm')
      .notEmpty()
      .withMessage('Password confirmation required'),
    
  check('phone')
  .optional()
  .isMobilePhone(['ar-EG', 'ar-SA'])
  .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

check('profileImg').optional(),
check('role').optional(),
    validatorMiddleware   
]

exports.changepasswordValidation=[
    check("id").isMongoId().withMessage("invalied"),
    body("currentPassword").notEmpty().withMessage("you must enter current Password"),
    body("passwordConfirm") .notEmpty()
    .withMessage('Password confirmation required'),
    body('password')  .notEmpty()
    .withMessage('Password required').custom(async(val,{req})=>{
        const user= await User.findById(req.params.id)
        if(!user){
            throw new Error('this is  no user for id')
        }
        const isCorrectPassword= await bcrypt.compare(req.body.currentPassword,user.password)

        if(!isCorrectPassword){
            throw new Error('incorrect current password')
        }
        if (val !== req.body.passwordConfirm) {
            throw new Error('Password Confirmation incorrect');
          }

    }),
    validatorMiddleware,
]










exports.updateUserValidator=[
    check("id").isMongoId().withMessage("invalied"),
    body("name").optional().custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true
    }),
    check("email").notEmpty()
    .withMessage("email required")
    .isEmail()
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error('E-mail already in user'));
          }
        })
      ), check('phone')
      .optional()
      .isMobilePhone(['ar-EG', 'ar-SA'])
      .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),
    
    check('profileImg').optional(),
    validatorMiddleware,
]


exports.deleteUserValidator=[
    check("id").isMongoId().withMessage("invalied"),
    validatorMiddleware,
]


exports.updateloggedValidator=[
  
  body("name").optional().custom((val,{req})=>{
      req.body.slug=slugify(val)
      return true
  }),
  check("email").notEmpty()
  .withMessage("email required")
  .isEmail()
  .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ), check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  validatorMiddleware,
]
