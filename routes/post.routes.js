// creating the router component
import { Router } from "express";

// importing the controllers
import {
  GetPost,
  GetUserTimeline,
  handelCreatePost,
  handelDeletePost,
  handelLikePost,
  handelUpdatePost,
} from "../controllers/post.controllers.js";

// creating the router element
const router = Router();

// create a post
router.post("/", handelCreatePost);

// update a post
router.put("/:id", handelUpdatePost);

// delete a post
router.delete("/:id", handelDeletePost);

// like & dislike a Post
router.put("/:id/like", handelLikePost);

// get user timeline
router.get("/timeline", GetUserTimeline);

// get a Post
router.get("/:id", GetPost);

// exporting the router component
export default router;
