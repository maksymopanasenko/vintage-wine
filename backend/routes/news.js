const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    getNews,
    addNews,
    getNewstById,
    uploadNewsImg
} = require("../controllers/news");

const { upload } = require("../commonHelpers/multer");

// @route   GET /news
// @desc    GET existing news
// @access  Public
router.get("/", getNews)

// @route   POST /news
// @desc    POST new article
// @access  Public
router.post("/", addNews)

// @route   POST /news
// @desc    POST new article
// @access  Private
router.patch(
    "/images/:id",
    passport.authenticate("jwt-admin", { session: false }),
    upload.single('image'),
    uploadNewsImg
)

// @route   GET /news/:id
// @desc    GET existing article by id
// @access  Public
router.get("/:id", getNewstById)

module.exports = router;