const User = require("../models/user");
const Following = require("../models/follow");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter email and password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "Invalid Credentials" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(404).json({ msg: "Invalid Credentials" });
  }

  const token = user.createJWT();
  res.status(200).json({ token });
};

const getUser = async (req, res) => {
  const { userId, name } = req.user;
  const followers = await Following.find({ following_id: userId });
  const following = await Following.find({ followed_id: userId });
  const user = {
    name: name,
    followers: followers.length,
    following: following.length,
  };

  res.status(200).json({ user });
};

module.exports = { authenticate, getUser };
