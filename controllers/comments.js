const mongoose = require("mongoose");
const Comment = require("../models/comments");

const postComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment || !comment.length) {
    return res.status(400).json({ msg: "comment can't be empty" });
  }

  const comments = await Comment.create({
    comment,
    post_id: id,
  });

  res.status(200).json({ msd: `comment id ${comments._id}` });
};

module.exports = postComment;
