const fs = require("fs");
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: data.length,
    data: { tours: data },
  });
};

exports.getOneTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = data.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  return null;
};

exports.updateTour = (req, res) => {
  return null;
};

exports.deleteTour = (req, res) => {
  return null;
};
