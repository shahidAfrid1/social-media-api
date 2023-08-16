const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
  },
  post_id: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
