const mongoose = require("mongoose");
const Post = require("../models/posts");
const Like = require("../models/likes");
const Comment = require("../models/comments");

const ConvertIntoArrayOfString = (data) => {
  const results = data.map((item) => item.comment);
  return results;
};

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;

  if (!title || !description || !title.length || !description.length) {
    return res.status(400).json({ msg: "title or description can't be empty" });
  }

  const post = await Post.create({
    title,
    description,
    created_by: userId,
  });

  res.status(200).json({ post });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).json({ msg: "Invalid Id" });
  }

  const post = await Post.findOne({ _id: id });

  if (!post) {
    return res.status(404).json({ msg: "Post does not exits" });
  }

  await Post.deleteOne({ _id: id });

  res.status(200).json({ msg: `Post ${id} is successfully Deleted` });
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).json({ msg: "Invalid Id" });
  }

  const post = await Post.findOne({ _id: id });

  if (!post) {
    return res.status(404).json({ msg: "Post does not exits" });
  }

  const likes = await Like.find({ post_id: id });
  const commments = await Comment.find({ post_id: id });
  const arrayOfComments = ConvertIntoArrayOfString(commments);

  const data = {
    id: post._id,
    title: post.title,
    description: post.description,
    comments: arrayOfComments,
    likes: likes.length,
    created_at: post.created_at,
  };

  res.status(200).json({ post: data });
};

const getAllPosts = async (req, res) => {
  const userId = req.user.userId;

  const data = await Post.find({ created_by: userId }).sort({ created_at: -1 });

  const posts = await Promise.all(
    data.map(async (post) => {
      const likes = await Like.find({ post_id: post._id });
      const comments = await Comment.find({ post_id: post._id });
      const arrayOfComments = ConvertIntoArrayOfString(comments);

      return {
        _id: post._id,
        title: post.title,
        description: post.description,
        comments: arrayOfComments,
        likes: likes.length,
        created_at: post.created_at,
      };
    })
  );

  res.status(200).json({ posts });
};

module.exports = { createPost, deletePost, getSinglePost, getAllPosts };
