const userRepository = require("../repository/UserRepo");
const { HashPassword, Token, ComparePassword } = require("../utils/helper");

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
    gender: user.gender
  });

  return token;
};

exports.LoginUser = async (data) => {
  let user = await userRepository.GetUserByEmail(data.email);
  if (!user) {
    throw new Error("User not found");
  }
  let MatchPassword = await ComparePassword( user.password,data.password);
  if (!MatchPassword) {
    throw new Error("Incorrect password");
  }
  let token = await Token({
    name: user.name,
    email: user.email,
    id: user.id,
    role: user.role,
    gender: user.gender
  });
  return token;
};

exports.UpdateUser = async (id, data) => {
  let user = await userRepository.GetUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await userRepository.UpdateUser(id, data);
};


exports.deleteUser = async (id, data) => {
  let user = await userRepository.GetUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await userRepository.DeleteUser(id);
}

exports.getAllUserById = async (id) => {
  let user = await userRepository.GetUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

exports.getAllUsers = async () => {
  return await userRepository.GetAllUsers();
};

exports.getUserByQuery = async (query) => {
  return await userRepository.GetuserByQuery(query);
};