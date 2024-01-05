import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import quiz from "./quiz";
import Loading from "./components/Loading";
import User from "./components/User";

// import { lockfilePatchPromise } from "next/dist/build/swc";

export default function Home() {
  // Fetching data
  const [data, setData] = useState();
  async function getData() {
    try {
      const res = await axios.get("http://localhost:2007/");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  const [currentQuiz, setCurrentQuiz] = useState(1);
  // User Information
  const [logState, setLogState] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logStateFrom = localStorage.getItem("loggedIn");
      setLogState(logStateFrom === "true");
      setCurrentUser(localStorage.getItem("currentUser"));
    }
  }, []);
  // Changing the page
  const router = useRouter();
  const startQuiz = (quizId) => {
    router.push(`/quiz?Id=${quizId}`);
  };
  const logIn = () => {
    router.push(`/login`);
  };
  const createQuiz = () => {
    router.push(`/create`);
  };
  // Delete function
  const deleter = (id) => {
    axios.delete(`http://localhost:2007/${id}`);
    getData();
  };
  // Loading
  if (data == null) {
    return <Loading />;
  }
  // Log in page
  if (logState !== null && logState == false) {
    logIn();
  }
  // Logged in page
  if (logState == true) {
    return (
      <div className="flex flex-col gap-10 bg-[url('/doodles.png')] h-[100vh] font-nunito">
        <User currentUser={currentUser} setLogState={setLogState} />
        <div className="flex flex-col items-center gap-[20px] mt-[100px]">
          <p className="text-[150px] drop-shadow-lg text-white">QUIZES</p>
          <div className="flex items-center gap-2 bg-black/[.3] p-2 rounded-xl h-[600px] w-[1500px] overflow-scroll">
            {data.quiz.map((quizes) => {
              var color =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
              function padZero(str, len) {
                len = len || 2;
                var zeros = new Array(len).join("0");
                return (zeros + str).slice(-len);
              }
              function invertColor(hex) {
                if (hex.indexOf("#") === 0) {
                  hex = hex.slice(1);
                }
                var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
                  g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
                  b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
                return "#" + padZero(r) + padZero(g) + padZero(b);
              }
              var invertcolor = invertColor(color);
              return (
                <div
                  className={`w-[1000px] h-[100%] flex flex-col gap-2 items-center justify-center rounded`}
                  style={{
                    backgroundColor: color,
                    color: invertcolor,
                  }}
                >
                  <p className="text-[40px] text-center h-[200px] drop-shadow-lg">
                    {quizes.name?.toUpperCase()}
                  </p>
                  <p>Question Amount: {quizes.questions.length}</p>
                  {quizes.creator == currentUser ? (
                    <div className="flex gap-2">
                      <p>Creator: You</p>
                      <button
                        className="text-sm p-1 border rounded-sm hover:bg-black/[.3]"
                        onClick={() => {
                          deleter(quizes._id);
                          getData();
                        }}
                        style={{ borderColor: invertcolor }}
                      >
                        Delete Quiz
                      </button>
                    </div>
                  ) : (
                    <p>Creator: {quizes.creator}</p>
                  )}
                  <button
                    className="text-sm p-1 border rounded-sm hover:bg-black/[.3]"
                    onClick={() => {
                      startQuiz(quizes._id);
                    }}
                    style={{ borderColor: invertcolor }}
                  >
                    Start Quiz
                  </button>
                </div>
              );
            })}
          </div>
          <p>or you could just</p>
          <button
            onClick={() => {
              createQuiz();
            }}
            className="bg-gray-200 hover:bg-gray-300 w-[200px] rounded-[10px]"
          >
            Create a new quiz
          </button>
        </div>
      </div>
    );
  }
}
