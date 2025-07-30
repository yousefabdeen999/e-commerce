const express = require("express");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,changepasswordValidation,updateloggedValidator
} = require("../utils/validator/Uservalidation ");

const {
  getUser,
  getUsers,
  creatUser,
  updateUser,
  deletUser,uploadUserImage,resizeImage,changeUserPaswword,getloggeduserData,updateLoggedUserPassword,updateLoggedUserData,deleteLoggedUserData
} = require("../srevices/userservice");
const Authsercice=require("../srevices/auth")

const router = express.Router();


router.route("/getMe").get(Authsercice.protect,getloggeduserData,getUser)
router.route("/changemypassword").put(Authsercice.protect,updateLoggedUserPassword)
router.route("/updateme").put(Authsercice.protect,updateloggedValidator,updateLoggedUserData)
router.route("/deletme").put(Authsercice.protect,deleteLoggedUserData)


router.route("/").get(Authsercice.protect,Authsercice.allowedTO("admin","manger"),getUsers).post(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadUserImage,resizeImage,createUserValidator, creatUser);
router
  .route("/:id")
  .get( getUserValidator,getUser)
  .put(Authsercice.protect,Authsercice.allowedTO("admin","manger"),uploadUserImage,resizeImage,updateUserValidator, updateUser)
  .delete( Authsercice.protect,Authsercice.allowedTO("admin","manger"),deleteUserValidator,deletUser);
router.put("/changePassword/:id",changepasswordValidation,changeUserPaswword)
module.exports = router;
