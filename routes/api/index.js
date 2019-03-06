const router = require("express").Router();
const pointsRoutes = require("./points");
const searchRoute = require("./search");

// Point routes
router.use("/points", pointsRoutes);

// Search route
router.use("/search", searchRoute);

module.exports = router;
