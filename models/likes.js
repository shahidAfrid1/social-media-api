const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
  post_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("Like", LikeSchema);
