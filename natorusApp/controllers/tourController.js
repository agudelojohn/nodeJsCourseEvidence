// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));

const notDefined = (res) =>
  res.status(500).json({
    status: 'Error',
    message: 'Route not yet defined',
  });

// exports.checkId = (req, res, next, val) => {
//   console.log('Middleware CheckID');
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

//Middleware to check the body shape
// Not need anymore regarding to model validations
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price || !req.body.duration) {
//     return res.status(400).json({
//       status: 'Error',
//       message: 'Bad request body, it is not matching requirements',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: data.length,
    // data: { tours },
  });
};

exports.getOneTour = (req, res) => {
  // const tour = tours.find((elem) => elem.id === req.params.id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = (req, res) => notDefined(res);

exports.deleteTour = (req, res) => notDefined(res);
