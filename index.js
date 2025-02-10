// Load environment variables first
import dotenv from "dotenv";

// Import dependencies
import connectDB from "./db/db.js";
import app from "./app.js";

//dotenv config
dotenv.config();

// Get variables from .env
const PORT = process.env.PORT || 8000;

// Connect MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if DB connection fails
  });
