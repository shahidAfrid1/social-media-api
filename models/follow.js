const mongoose = require("mongoose");

const FollowingSchema = mongoose.Schema({
  following_id: {
    type: String,
  },
  followed_id: {
    type: String,
  },
});

module.exports = mongoose.model("Following", FollowingSchema);
