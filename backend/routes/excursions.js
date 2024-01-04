const express = require("express");
const router = express.Router();
const passport = require("passport");


//Import controllers
const {
  getExcursions,
  reserveExcursion,
  addExcursion,
  uploadExcursionImg,
  deleteExcursion,
  editExcursion
} = require("../controllers/excursions");

const { upload } = require("../commonHelpers/multer");


// @route   GET /excursions
// @desc    GET existing excursions
// @access  Public
router.get("/", getExcursions);

// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addExcursion
);

// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  upload.single('imageURL'),
  uploadExcursionImg
);


// @access  Public
router.put("/reservation/:title", reserveExcursion);


// @route   DELETE /excursions/:id
// @desc    DELETE existing excursion
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  deleteExcursion
);

// @route   DELETE /excursions/:id
// @desc    DELETE existing excursion
// @access  Private
router.patch(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  editExcursion
);


module.exports = router;
