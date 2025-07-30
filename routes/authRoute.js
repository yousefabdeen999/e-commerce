const express = require("express");

const {
  SignupValidator,LoginValidator
} = require("../utils/validator/authvalidator");

const {
  Signup,Login,forgotPassword,verifyPassRestcode,resetPassword
} = require("../srevices/auth");

const router = express.Router();

router.route("/signup").post(SignupValidator,Signup);
router.route("/login").post(LoginValidator,Login);
router.route("/forgotPassword").post(forgotPassword)
router.route("/verifyPassRestcode").post(verifyPassRestcode)
router.route("/resetPassword").put(resetPassword)



//router
  //.route("/:id")
  //.get( getUserValidator,getUser)
  //.put(uploadUserImage,resizeImage,updateUserValidator, updateUser)
  //.delete( deleteUserValidator,deletUser);

module.exports = router;
