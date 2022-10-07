const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A toour needs a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 0.8,
  },
  price: {
    type: String,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
