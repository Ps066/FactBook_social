import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// importing all user made routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

// creating express app
const app = express();

// middelwares
app.use(express.json());
app.use(helmet());
app.use(morgan());

// all user middelwars
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

export default app;
