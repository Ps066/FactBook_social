import Post from "../models/post.models.js";
import User from "../models/user.models.js";

// @desc    create a post
// @route   POST api/post/
// @access  Private
export const handelCreatePost = async (req, res) => {
  try {
    // craeting a new post instance
    const newPost = new Post(req.body);

    // saving the post
    const post = await newPost.save();

    // returning the resposne
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc    update a post
// @route   PUT api/post/:id
// @access  Private
export const handelUpdatePost = async (req, res) => {
  // fetching the post id to be edited
  const id = req.params.id;

  try {
    // fetching the post to be edited
    const post = await Post.findById(id);

    // checking if the current user is editing the post
    if (req.body.userId === post.userId) {
      await post.updateOne({
        $set: req.body,
      });

      // sending the response
      res.status(200).json("post updated");
    } else {
      res.status(403).json("You are not athorozied to edit this post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc    delete a post
// @route   DELETE api/post/:id
// @access  Private
export const handelDeletePost = async (req, res) => {
  // fetching the post id that needs to be deleted
  const id = req.params.id;

  try {
    // fetching post that should be deleted
    const post = await Post.findById(id);

    // only post owner can delete it
    if (req.body.userId === post.userId) {
      await post.deleteOne();
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("You are not athorozied to delet this post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc    like/dislike a post
// @route   PUT api/post/:id/like
// @access  Private
export const handelLikePost = async (req, res) => {
  // fetching the post id that will be liked
  const id = req.params.id;

  try {
    // fetching the post that will be liked
    const post = await Post.findById(id);

    // checking if current user likes the post
    if (!post.likes.includes(req.body.userId)) {
      // it reads if post hasnt been liked by this user
      await post.updateOne({ $push: { likes: req.body.userId } }); // current user liked
      res.status(200).json("You have liked this post");
    } else {
      // it reads if post has been liked by this user
      await post.updateOne({ $pull: { likes: req.body.userId } }); // current user disliked
      res.status(200).json("You have disliked this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc    get user timeline
// @route   GET api/post/timeline
// @access  Private
export const GetUserTimeline = async (req, res) => {
  try {
    // first fetching the current user
    const curUser = await User.findById(req.body.userId);

    // to see if user exists
    if (!curUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // fetching the current user post
    const userPosts = await Post.find({ userId: curUser._id });

    // this will have all friends post
    let friendsPosts = []; // Declare outside

    // Check if the user has friends before mapping
    if (curUser.followings && curUser.followings.length > 0) {
      // fetching the posts of friends
      friendsPosts = await Promise.all(
        curUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
    }

    // sending concatinated response
    res.json(userPosts.concat(...friendsPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc    get a post
// @route   GET api/post/:id
// @access  Private
export const GetPost = async (req, res) => {
  // fetching the id of post we want
  const id = req.params.id;

  try {
    // fetching (finding) the post
    const post = await Post.findById(id);

    // resposne
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// below code is logic for dislike post
// dislike a Post
// router.put('/:id/dislike', async (req,res)=>{
//     // fetching the post id that will be disliked
//     const id = req.params.id;

//     try {
//         // fetching the post that will be disliked
//         const post = await Post.findById(id);

//         // checking if current user has liked the post
//         if(post.likes.includes(req.body.userId)){ // it reads if post has been liked by this user
//             await post.updateOne({$pull:{likes:req.body.userId}}); // current user liked
//             res.status(200).json("You have disliked this post");
//         }else{
//             res.status(403).json("You have to fisrt like this post to unlike it");
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })
