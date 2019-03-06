const router = require("express").Router();
const pointsController = require("../../controllers/pointsController");

// Matches with "/api/search/:query"
// find keywords in top points
router
    .route("/mypoints")
    .post(pointsController.myPoints)
router
    .route("/:query")
    .get(pointsController.search)



module.exports = router;