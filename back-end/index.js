import express from "express";
const app = express();
import cors from "cors";
import { typeRouter } from "./src/routes/type-route.js";
import mongoose from "mongoose";

app.use(cors());
app.use(express.json());

// Specifying a number to use it as the port number when launching
const port = 2007;

// TypeRouter
app.use(typeRouter);

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://MongolDaichin:testpassword@cluster0.bfareel.mongodb.net/"
  );
  console.log("done");
};
connectDb();

// Launching server
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
