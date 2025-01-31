const userService = require("../services/UserService");

exports.SignUp = async (req, res) => {
  try {
    let user = await userService.CreateUser(req.body);
    return res.send(user);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};
