const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

//Param Middleware->
// router.param("id", tourController.checkId);

router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
