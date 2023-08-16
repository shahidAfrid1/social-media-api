const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  return canditatePassword === this.password;
};

module.exports = mongoose.model("User", UserSchema);
