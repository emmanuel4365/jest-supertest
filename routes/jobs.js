const express = require("express");
const router = express.Router();

// Importing jobs controller methods
const {
  getJobs,
  getJob,
  newJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController.js");

const { isAuthenticatedUser } = require("../middlewares/auth.js");

router.route("/jobs").get(getJobs);
router.route("/job/:id").get(getJob);

router.route("/job/new").post(isAuthenticatedUser, newJob);

router
  .route("/job/:id")
  .put(isAuthenticatedUser, updateJob)
  .delete(isAuthenticatedUser, deleteJob);

module.exports = router;
