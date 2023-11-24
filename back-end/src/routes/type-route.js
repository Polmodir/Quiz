import express from "express";
import { getTypes } from "../controller/type-controller.js";
import { postTypes } from "../controller/type-controller.js";
export const typeRouter = express.Router();

typeRouter.get("/", getTypes);
typeRouter.post("/", postTypes);
