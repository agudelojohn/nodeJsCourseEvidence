const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
  })
  .then(() => console.log('DB connection succesful!!'))
  .catch((err) => console.log('Error: => ', err));

// SERVER
const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
