const mongoose = require("mongoose");
const User = require("../models/user");
const Following = require("../models/follow");

const follow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).json({ msg: "Invalid Id" });
  }

  if (id === userId) {
    return res.status(400).json({ msg: "You can't follow yourself" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ msg: "User doesn't exits" });
  }

  const isAlreadyFollowed = await Following.findOne({
    following_id: id,
    followed_id: userId,
  });

  if (isAlreadyFollowed) {
    return res.status(400).json({ msg: `You have already followed ${id}` });
  }

  const following = await Following.create({
    following_id: id,
    followed_id: userId,
  });

  res.status(200).json({ msg: `You successfully followed ${id}` });
};

const unfollow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).json({ msg: "Invalid Id" });
  }

  if (id === userId) {
    return res.status(400).json({ msg: "You can't unfollow yourself" });
  }

  const unfollowing = await Following.findOne({
    following_id: id,
    followed_id: userId,
  });

  if (!unfollowing) {
    return res.status(404).json({ msg: `You have not followed ${id}` });
  }

  const unfollowed = await Following.deleteOne({ _id: unfollowing._id });

  res.status(200).json({ msg: `You successfully unfollowed ${id}` });
};

module.exports = { follow, unfollow };
