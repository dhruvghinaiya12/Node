const userRepository = require("../repository/UserRepo");
const { HashPassword, Token } = require("../utils/helper");

exports.CreateUser = async (data) => {
  let user = await userRepository.GetUserByEmail(data.email);
  if (user) {
    throw new Error("User already exists");
  }
  let hash = await HashPassword(data.password);
  data.password = hash;

  user = await userRepository.RegisterUser(data);

  let token = await Token({
    name: user.name,
    email: user.email,
    id: user.id,
    role: user.role,
  });

  return token;
};
