const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();

//Middleware to check the body shape
const myCheckBody = (req, res, next) => {
  const keys = Object.keys(req);
  const name = keys.find((elem) => elem === "name");
  const duration = keys.find((elem) => elem === "duration");
  if (!name || !duration) {
    res.status(400).json({
      status: "Error",
      message: "Bad request body, it is not matching requirements",
    });
  }
  next();
};

//Param Middleware->
router.param("id", tourController.checkId);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(myCheckBody, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
