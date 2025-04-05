const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor, saveRedirectUrl } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Reviews post request
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review request
router.delete("/:reviewId",saveRedirectUrl, isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destoryReview));

module.exports = router;