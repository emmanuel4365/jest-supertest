const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  uploadImage,
  sendEmailToUser,
  test,
} = require("../controllers/authController.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/upload/image").post(uploadImage);
router.route("/email").post(sendEmailToUser);

router.route("/test").get(test);

module.exports = router;
