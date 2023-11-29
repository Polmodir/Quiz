import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  creator: String,
  name: String,
  questions: Array,
});
export const QuizModel = mongoose.model("quiz", quizSchema);
