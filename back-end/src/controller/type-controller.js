import { UserModel } from "../../models/user-model.js";
import { QuizModel } from "../../models/quiz-model.js";
import { request } from "http";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const getTypes = async (req, res) => {
  const users = await UserModel.find({});
  const quiz = await QuizModel.find({});
  res.status(200).json({ users: users, quiz: quiz });
};
export const createQuiz = async (req, res) => {
  const body = req.body;
  const users = await UserModel.find({});
  const quiz = await QuizModel.find({});
  // const hashedPassword = await bcrypt.hash(body.password, 10); this is destroying my code somehow
  if (body.type == "user") {
    await UserModel.create({
      email: body.email,
      password: hashedPassword,
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
export const idVerify = async (req, res) => {
  const body = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "quizmaster060@gmail.com",
      pass: "dwoocbwaxswhrpdj",
    },
  });
  const mailOptions = {
    from: "quizmaster060@gmail.com",
    to: body.gmail,
    subject: "Your super duper secret code",
    text: code,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  res.status(200).send({ code: code });
};

export const test = async (req, res) => {
  const body = req.body;
};
