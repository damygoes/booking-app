import express from "express";
import { login, register } from "../controllers/authcontroller.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello, this is auth endpoint");
// });
router.post("/register", register);
router.get("/login", login);

export default router;
