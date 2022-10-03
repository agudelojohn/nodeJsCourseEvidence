const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

const notDefined = (res) => {
  return res.status(500).json({
    status: "Error",
    message: "Route not yet defined",
  });
};

exports.checkId = (req, res, next, val) => {
  console.log("Middleware CheckID");
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: data.length,
    data: { tours },
  });
};

exports.getOneTour = (req, res) => {
  const tour = tours.find((elem) => elem.id === req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  return notDefined(res);
};

exports.updateTour = (req, res) => {
  return notDefined(res);
};

exports.deleteTour = (req, res) => {
  return notDefined(res);
};
