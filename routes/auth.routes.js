// importing all the controllers
import {
  handelLoginUser,
  handelRegisterUser,
} from "../controllers/auth.controllers.js";

// creating the router component
import { Router } from "express";

// creating the router
const router = Router(); // ✅ Creates an Express router instance

// register route
router.post("/register", handelRegisterUser);

// login route
router.post("/login", handelLoginUser);

// exporting the router component
export default router;
