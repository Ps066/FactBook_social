// all imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// importing all user made routes
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')

// creating express app
const app = express();

// all other configs
dotenv.config();

// all variables from dotenv
const PORT = process.env.PORT;
const MONGO = process.env.MONGO_URL;

//connecting mongoDB to our application using mongoose 
mongoose.connect(MONGO).then(()=>console.log("MongoDB is connected")).catch((err)=>{console.error(err)})

// middelwares
app.use(express.json());
app.use(helmet());
app.use(morgan());

// all user middelwars
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);

// building our app to run on PORT
app.listen(PORT, () => {
  console.log(`The app is runnning on port ${PORT}`);
});
