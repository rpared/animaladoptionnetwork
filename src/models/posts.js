// utils/posts.js
import mongoose, { Schema } from "mongoose";

const postsSchema = new Schema({
  name: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.models.Posts || mongoose.model("Posts", postsSchema);

export default Posts;
