const { check, body } = require("express-validator");

const validatorMiddleware=require('../../middelwares/validatorMiddleware');
const { default: slugify } = require('slugify');
const User = require("../../models/usermodel");
const bcrypt = require('bcryptjs');



exports.SignupValidator=[
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
    

    validatorMiddleware   
]



exports.LoginValidator=[
  
      check("email").notEmpty()
      .withMessage("email required")
      .isEmail()
      ,
        check('password')
      .notEmpty()
      .withMessage('Password required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      ,
  
      validatorMiddleware   
  ]
  

