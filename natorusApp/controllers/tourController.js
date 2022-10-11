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

exports.getAllTours = async (req, res) => {
  try {
    //1. Build the query
    //1.1. Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1.2. Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    //1.3. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      //How multiple sort values would see like:
      //sort('price')
      //sort('price duration')
    } else {
      //This is a default value for sorting
      query = query.sort('-createdAt');
    }

    //1.4 Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v ');
    }

    //2. Execute the query
    const tours = await query;

    //3. Send response
    await res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    await res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    await res.status(201).json({
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidatos: true,
    });
    await res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    await res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
