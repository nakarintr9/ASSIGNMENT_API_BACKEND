const user = require("./../models/user");
const bcrypt = require("bcryptjs");
const constants = require("./../constant");

// Login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let result = await user.findOne({ where: { username: username } });
    if (result != null) {
      if (bcrypt.compareSync(password, result.password)) {
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result),
        });
      } else {
        res.json({
          result: constants.kResultNok,
          message: "Incorrect password",
        });
      }
    } else {
      res.json({ result: constants.kResultNok, message: "Incorrect username" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Register
exports.register = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let result = await user.create(req.body);
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
};

// Query all users
exports.users = async (req, res, next) => {
  let result = await user.findAll();
  res.json(result);
};
