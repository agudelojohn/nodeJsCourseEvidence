const notDefined = (res) => {
  return res.status(500).json({
    status: "Error",
    message: "Route not yet defined",
  });
};

exports.getAllUsers = (req, res) => {
  notDefined(res);
};
exports.createuser = (req, res) => {
  notDefined(res);
};
exports.getuser = (req, res) => {
  notDefined(res);
};
exports.updateUser = (req, res) => {
  notDefined(res);
};
exports.deleteUser = (req, res) => {
  notDefined(res);
};
