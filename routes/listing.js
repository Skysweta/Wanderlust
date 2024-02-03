const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");
const {listingSchema,  reviewSchema} =require("../schema.js");
const Listing =require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get( wrapAsync(listingController.index)) // index route
.post( isLoggedIn,upload.single('listing[image]'),validateListing,      // create route
 wrapAsync( listingController.createListing)
);

//NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing)) //show
.put(isLoggedIn,isOwner,
upload.single('listing[image]'),validateListing,       // update
wrapAsync(listingController.updateListing))
.delete( isLoggedIn,isOwner,                   // delete
 wrapAsync(listingController.destroyListing)
);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,
 wrapAsync(listingController.renderEditForm)
);

module.exports= router;