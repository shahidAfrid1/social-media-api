require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const authenticateUser = require("./middlewares/authentication");
const { authenticate, getUser } = require("./controllers/auth");
const { follow, unfollow } = require("./controllers/following");
const {
  createPost,
  deletePost,
  getSinglePost,
  getAllPosts,
} = require("./controllers/posts");
const { like, unlike } = require("./controllers/likes");
const postComment = require("./controllers/comments");
const app = express();

//middlewares
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => res.send("Social Media API"));
app.post("/api/authenticate", authenticate);
app.post("/api/follow/:id", authenticateUser, follow);
app.delete("/api/unfollow/:id", authenticateUser, unfollow);
app.get("/api/user", authenticateUser, getUser);
app.post("/api/posts", authenticateUser, createPost);
app.post("/api/posts/:id", authenticateUser, deletePost);
app.post("/api/like/:id", authenticateUser, like);
app.delete("/api/unlike/:id", authenticateUser, unlike);
app.post("/api/comment/:id", authenticateUser, postComment);
app.get("/api/posts/:id", authenticateUser, getSinglePost);
app.get("/api/all_posts", authenticateUser, getAllPosts);

//server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => console.log("Server is running at PORT 3000..."));
  } catch (error) {
    console.log(error);
  }
};

start();
