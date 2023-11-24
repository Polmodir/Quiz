import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  creator: String,
  name: String,
  questions: [
    {
      questions: String,
      answers: Array,
      correct: Number,
    },
  ],
});
hey = [
  {
    id: 1,
    creator: "blueg7783@email.com",
    name: "polmodir's quiz",
    questions: [
      { question: "how old is pol?", answers: [16, 13, 14, 15], correct: 1 },
      {
        question: "what is pol's true name?",
        answers: ["battulga", "tulgabat", "pomidor", "polymer"],
        correct: 2,
      },
    ],
  },
];
export const QuizModel = mongoose.model("quiz", quizSchema);
