import express from "express";
import { createQuiz, getTypes } from "../controller/type-controller.js";
import { deleteQuiz } from "../controller/type-controller.js";
import { idVerify } from "../controller/type-controller.js";
import { test } from "../controller/type-controller.js";
import { logIn } from "../controller/login-controller.js";
export const typeRouter = express.Router();

typeRouter.get("/", getTypes);
typeRouter.post("/", createQuiz);
typeRouter.delete("/:id", deleteQuiz);
typeRouter.put("/", idVerify);
typeRouter.patch("/", test);
typeRouter.post("/login", logIn);
