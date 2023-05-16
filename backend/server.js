import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import {
  createValidation,
  loginValidation,
  registerValidation,
} from "./validation/validation.js";
import { getMe, login, register } from "./controllers/UserController.js";
import checkAuth from "./middleware/checkAuth.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/RecipeController.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/phoneShop")
  .then(() => console.log("db work"))
  .catch((err) => console.log("db error", err));

const app = express();
const PORT = 4444;

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static('uploads'))

app.listen(PORT, (err) => {
  if (err) {
    return res.status(500).json({
      message: "Сервер лег",
    });
  }
  console.log(`Server run on ${PORT} port`);
});
app.get("/auth/me", checkAuth, getMe);
app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);

app.post("/upload", upload.single("image"), (req, res) => {
  return res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/recipes", getAll);
app.get("/recipe/:id", getOne);
app.delete("/recipe/:id", checkAuth, remove);
app.patch("/recipe/:id", checkAuth, update);
app.post("/recipes/new", checkAuth, createValidation, create);
