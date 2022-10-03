const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createuser,
  getuser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

router.route("/").get(getAllUsers).post(createuser);
router.route("/:id").get(getuser).patch(updateUser).delete(deleteUser);

module.exports = router;
