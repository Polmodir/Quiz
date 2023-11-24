import { UserModel } from "../../models/user-model.js";
import { QuizModel } from "../../models/quiz-model.js";

export const getTypes = async (req, res) => {
  const users = await UserModel.find({});
  const quiz = await QuizModel.find({});
  res.status(200).json({ users: users, quiz: quiz });
};
export const postTypes = async (req, res) => {
  const body = req.body;
  const users = await UserModel.find({});
  const quiz = await QuizModel.find({});

  if (body.type == "user") {
    await UserModel.create({
      email: body.email,
      password: body.password,
    });
    res.status(200).send({ users: users, quiz: quiz });
  }
  if (body.type == "quiz") {
    await QuizModel.create({
      creator: String,
      name: String,
      questions: Array,
    });
  }
};
