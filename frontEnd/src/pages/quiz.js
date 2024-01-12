import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "./components/Loading";
import User from "./components/User";
import { FaRegDizzy } from "react-icons/fa";
import { FaRegGrinStars } from "react-icons/fa";
import { FaRegFrown } from "react-icons/fa";
import { FaRegGrimace } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";

export default function quiz() {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(localStorage.getItem("currentUser"));
    }
  }, []);
  // Getting Id
  const params = useSearchParams();
  const id = params.get("Id");
  // Fetching data
  const [data, setData] = useState();
  const [results, setResults] = useState({});
  // console.log("results", results);
  async function getData() {
    try {
      const res = await axios.get("http://localhost:2007/");
      // console.log("");
      console.log("dsadjoias", res.data.quiz);
      setData(res.data);
      var tempQuiz;
      res.data.quiz.map((e) => {
        if (e._id == id) {
          tempQuiz = e;
        }
      });
      console.log(tempQuiz);
      setResults(
        tempQuiz.questions.reduce((prev, _, index) => {
          return { ...prev, [index + 1]: false };
        }, {})
      );
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, [id]);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Changing the page
  const router = useRouter();
  const goHome = () => {
    router.push(`/`);
  };
  // Log In function
  const [logState, setLogState] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logStateFrom = localStorage.getItem("loggedIn");
      setLogState(logStateFrom === "true");
    }
  }, []);
  // Resetter
  const retaker = () => {
    setQuestionNumber(1);
    results[1] = false;
    Object.keys(results).map((answer) => {
      setResults({ ...results, [answer]: false });
    });
    console.log(results);
  };
  // Main Page
  if (data == null) {
    return <Loading />;
  }
  // Id Checker
  var idFilter = {};
  data.quiz.map((e) => {
    if (e._id == id) {
      idFilter = e;
    }
  });
  var resultperc =
    (Object.keys(results).filter((key) => results[key] == true).length * 100) /
    idFilter.questions.length;
  if (logState !== null && logState == false) {
    goHome();
  }
  return (
    <div className="flex flex-col bg-[url('/doodles.png')] h-[100vh] font-nunito">
      <User currentUser={currentUser} />
      <button
        onClick={() => {
          goHome();
        }}
        className="w-[250px] text-[32px] bg-red-800 hover:bg-red-900 absolute right-[0px] top-[0px] rounded flex justify-center gap-5"
      >
        Give up?
        <Image src={"/baby.png"} height={40} width={40} />
      </button>
      {questionNumber < Object.keys(results).length + 1 ? (
        <div className="flex flex-col items-center  mt-[70px]">
          <p className="text-xl">{idFilter.name}</p>
          <p className="text-[100px] text-white drop-shadow-lg text-center">
            {questionNumber}. {idFilter.questions[questionNumber - 1]?.question}
          </p>
          <div className="flex absolute bottom-[0px] wrap gap-2 flex-wrap w-[2000px] text-[50px] bg-black/[.3] rounded-[25px] justify-center p-3">
            {idFilter.questions[questionNumber - 1]?.answers.map(
              (question, idx) => {
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
                  <button
                    onClick={() => {
                      if (
                        idx + 1 ==
                        idFilter.questions[questionNumber - 1].correct
                      ) {
                        setResults((prev) => ({
                          ...prev,
                          [questionNumber]: true,
                        }));
                        setQuestionNumber(questionNumber + 1);
                      } else {
                        setQuestionNumber(questionNumber + 1);
                      }
                    }}
                    className="w-[980px] h-[200px] rounded-[15px]"
                    style={{ backgroundColor: color }}
                  >
                    {question}
                  </button>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh] mt-[50px] gap-20">
          <div className="text-[150px] border-[5px] bg-black/[.5] border-black rounded-xl flex flex-col items-center p-5 text-white">
            <p>
              {idFilter.questions.length}/
              {
                Object.keys(results).filter((key) => results[key] == true)
                  .length
              }
            </p>
          </div>
          <div className="text-white">
            <div className="flex gap-[10px] text-[30px]">
              <p>your results:</p>
              <p>{resultperc}%</p>
              {resultperc > 20 ? (
                resultperc > 40 ? (
                  resultperc > 60 ? (
                    resultperc > 80 ? (
                      <FaRegGrinStars className="h-[40px]" />
                    ) : (
                      <FaRegSmile className="h-[40px]" />
                    )
                  ) : (
                    <FaRegGrimace className="h-[40px]" />
                  )
                ) : (
                  <FaRegFrown className="h-[40px]" />
                )
              ) : (
                <FaRegDizzy className="h-[40px]" />
              )}
            </div>
            <div className="bg-black/[.3] h-[650px] rounded-xl p-2 text-[30px] flex flex-col gap-[20px] overflow-y-scroll">
              {Object.keys(results).map((x, idx) => {
                return (
                  <div className="flex gap-2">
                    <p>{idx + 1}: </p>
                    {results[x] ? (
                      <p className="text-green-500">Correct</p>
                    ) : (
                      <p className="text-red-500">
                        Incorrect. Actual answer:{" "}
                        {
                          idFilter.questions[idx].answers[
                            idFilter.questions[idx].correct - 1
                          ]
                        }
                      </p>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => {
                  retaker();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-black"
              >
                Retake the quiz
              </button>
              <a
                href="https://en.wikipedia.org/wiki/Suicide_methods"
                className="absolute right-[0px] bg-red-800/[.5] bottom-0 text-white font-serif text-[15px] w-[200px] h-[180px] text-center flex flex-col items-center border-2 border-red-800 rounded-[100%] p-3"
              >
                <Image src={"/troll.png"} width={100} height={100} />
                Click here if you still have trouble with the quiz after seeing
                the answers
              </a>
            </div>
          </div>
        </div>
      )}
      {/* <p>{data.quiz[id - 1]?.questions[questionNumber - 1].question}</p>
        <div className="flex gap-2">{}</div> */}
    </div>
  );
  // }
}
