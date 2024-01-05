import { UserModel } from "../../models/user-model.js";
import { QuizModel } from "../../models/quiz-model.js";
import { request } from "http";
import bcrypt from "bcrypt";

export const logIn = async (req, res) => {
  console.log("starting");
  const body = req.body;
  const trueUser = await UserModel.findOne({ email: body.email });
  if (!trueUser) {
    res.json({ status: false });
  } else {
    if (await bcrypt.compare(body.password, trueUser.password)) {
      res.json({ status: true, user: trueUser });
    } else {
      res.json({ status: false });
    }
  }
};
