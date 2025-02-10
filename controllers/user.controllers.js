import User from "../models/user.models.js";

// import bcrypt
import bcrypt from "bcrypt";

// @desc    get a user
// @route   GET api/user/:id
// @access  Public
export const GetUser = async (req, res) => {
  // fetch the id from url
  const id = req.params.id;

  try {
    //fetch user through id
    const user = await User.findOne({ _id: id });

    // return user details
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {}
};

// @desc    update user
// @route   PUT api/user/:id
// @access  Private
export const handelUpdateUser = async (req, res) => {
  // first store the id
  const id = req.params.id;

  // only valid user or admin can update
  if (req.body.userId === id) {
    // it wil only work if user exists
    if (req.body.password) {
      // its important to hash newly updated pass
      try {
        const salt = await bcrypt.genSalt(15);
        req.body.password = await bcrypt.hash(req.body.password, salt); // hash stored in new password as well
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    // now just updating the user
    try {
      // findByIdAndUpdate
      const user = await User.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json("User updated!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only edit your own account!!");
  }
};

// @desc    delete user
// @route   DELETE api/user/:id
// @access  Private
export const handelDeleteUser = async (req, res) => {
  // fetching the user id
  const id = req.params.id;

  // user can delete only its id
  if (req.body.userId === id) {
    try {
      await User.deleteOne({ _id: id });
      res.status(200).json("User deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can delete only your account!");
  }
};

// @desc    follow a user
// @route   PUT api/user/:id/follow
// @access  Private
export const handelFollowUser = async (req, res) => {
  // fetch id of user we want to follow
  const id = req.params.id;

  // fetch id of the currUser that is trying to follow someone
  const curId = req.body.userId;

  // check if we are trying to follow ourself
  if (curId !== id) {
    try {
      // finding the user to follow
      const user = await User.findById(id);

      // finding the current user who is trying to follow the user
      const currUser = await User.findById(curId);

      // if else block to check if the curUser already follows the user
      if (!user.followers.includes(curId)) {
        // this translates as if user dont have usrId in followers
        await user.updateOne({ $push: { followers: curId } });
        await currUser.updateOne({ $push: { followings: id } });
        res.status(200).json("You started following this account");
      } else {
        // condition when they are already been follwoed
        res.status(403).json("You are already following this account");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    // case when we are attempting the follow ourself
    res.status(403).json("You cant follow yourself");
  }
};

// @desc    unfollow a user
// @route   PUT api/user/:id/unfollow
// @access  Private
export const handelUnFollowUser = async (req, res) => {
  // fetch the user id of the user you want to unfollow
  const id = req.params.id;

  // fetch the user if of the user who is going to unfollow
  const curId = req.body.userId;

  // conditional logic to see if the user is trying to unfollow thereself
  if (curId !== id) {
    // try catch to do operations
    try {
      // fetching the user who is been unfollowed
      const user = await User.findById(id);

      // fetching the curr user who will unfollow the user
      const currUser = await User.findById(curId);

      // conditional logic to check if the user follows the one they are trying to unfollow
      if (user.followers.includes(curId)) {
        // condition of already follwoing
        await user.updateOne({ $pull: { followers: curId } });
        await currUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("You unfollowed the user");
      } else {
        res.status(403).json("You can only unfollow users you follow!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
};
