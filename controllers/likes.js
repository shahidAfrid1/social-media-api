const mongoose = require("mongoose");
const Post = require("../models/posts");
const Like = require("../models/likes");

const like = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).json({ msg: "Invalid Id" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ msg: "Post doesn't exits" });
  }

  const isAlreadyLiked = await Like.findOne({
    post_id: id,
    user_id: userId,
  });

  if (isAlreadyLiked) {
    return res.status(400).json({ msg: `You have already Liked ${id}` });
  }

  const Likes = await Like.create({
    post_id: id,
    user_id: userId,
  });

  res.status(200).json({ msg: `You successfully Liked the post ${id}` });
};

const unlike = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).json({ msg: "Invalid Id" });
  }

  const unlikes = await Like.findOne({
    post_id: id,
    user_id: userId,
  });

  if (!unlikes) {
    return res.status(400).json({ msg: `You have not liked this Post ${id}` });
  }

  const unliked = await Like.deleteOne({ _id: unlikes._id });

  res.status(200).json({ msg: `You successfully unliked this Post ${id}` });
};

module.exports = { like, unlike };
