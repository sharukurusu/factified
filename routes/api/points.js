const router = require("express").Router();
const pointsController = require("../../controllers/pointsController");

// Matches with "/api/points"
// Populates homepage with new ideas
router.route("/")
    .get(pointsController.findAll)
    .post(pointsController.create);
router
    .route("/:id")
    .post(pointsController.findById)
router
    .route("/:id/vote")
    .post(pointsController.vote)
router
  .route("/:id/subpoint")
  .post(pointsController.createSubPoint)
  .get(pointsController.findById)
  .put(pointsController.update)
  .delete(pointsController.remove);

module.exports = router;
