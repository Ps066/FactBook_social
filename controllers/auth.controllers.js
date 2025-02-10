import User from "../models/user.models.js";

// importing packages
import bcrypt from "bcrypt";

// @desc    register route
// @route   POST /api/auth/register
// @access  Public
export const handelRegisterUser = async (req, res) => {
  // try catch statement
  try {
    // fetching all auth data,
    const userName = req.body.username;
    const email = req.body.email;
    const pass = req.body.password;

    // generating salt for password hashing
    const salt = await bcrypt.genSalt(15);

    // hashing the password for extra added security
    const hashedPass = await bcrypt.hash(pass, salt);

    // creating new user using hashed pass
    const newUser = new User({
      username: userName,
      email: email,
      password: hashedPass,
    });

    // saving the newly created user
    const user = await newUser.save();

    // we will only return username
    const { username, ...others } = user._doc;

    // sending the response to user
    res.status(200).json(username);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc     login route
// @route    POST api/auth/login
// @access   Private
export const handelLoginUser = async (req, res) => {
  // all variables
  const email = req.body.email;
  const pass = req.body.password;
  try {
    // finding if user exists
    const user = await User.findOne({ email: email });

    // if else conditional logic
    if (user) {
      // if user exists we will compare the passwords
      const validated = await bcrypt.compare(pass, user.password);
      if (validated) {
        // if password matches we will only send data other than password
        const { password, ...others } = user._doc;

        // sending the data with succcess code
        res.status(200).json(others);
      } else {
        res.status(400).json("Incorrect Login Credientials!!");
      }
    } else {
      res.status(404).json("No such user exists!!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
