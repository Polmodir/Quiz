import { UserModel } from "../../models/user-model.js";
import { QuizModel } from "../../models/quiz-model.js";
import { request } from "http";

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
    var newElement = {
      creator: body.creator,
      name: body.name,
      questions: [],
    };
    body.questions.map((question) => {
      newElement.questions.push(question);
    });
    await QuizModel.create(newElement);
    res.status(200).send({ users: users, quiz: quiz });
  }
};
export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  const users = await UserModel.find({});
  const quiz = await QuizModel.find({});

  await QuizModel.deleteOne({ _id: id });
  res.status(200).send({ users: users, quiz: quiz });
};
