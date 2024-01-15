import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import User from "./components/User";
import Head from "next/head";

export default function create() {
  // Current User
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(localStorage.getItem("currentUser"));
    }
  }, []);
  // Go Home
  const router = useRouter();
  const goHome = () => {
    router.push(`/`);
  };
  // Log In function
  const [logState, setLogState] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logStateFrom = localStorage.getItem("loggedIn");
      setLogState(logStateFrom === "true");
      console.log(logState);
    }
  }, []);
  // Text Stuff
  const [typName, setTypName] = useState("");
  const [list, setList] = useState([
    {
      typQuestion: "",
      typAnswer1: "",
      typAnswer2: "",
      typAnswer3: "",
      typAnswer4: "",
      Correct: 0,
    },
  ]);
  const typer = (value, name, count) => {
    list[count][name] = value;
    console.log(list);
  };
  // Adder
  const adder = () => {
    setList([
      ...list,
      {
        typQuestion: "",
        typAnswer1: "",
        typAnswer2: "",
        typAnswer3: "",
        typAnswer4: "",
        Correct: 0,
      },
    ]);
  };
  // Finisher
  const finisher = () => {
    var allChecked = [];
    list.map((el, idx) => {
      if (
        typName !== "" &&
        el.typQuestion !== "" &&
        el.typAnswer1 !== "" &&
        el.typAnswer2 !== "" &&
        el.typAnswer3 !== "" &&
        el.typAnswer4 !== "" &&
        el.Correct !== 0
      ) {
        allChecked.push(true);
      } else {
        allChecked.push(false);
      }
    });
    console.log(allChecked);
    if (allChecked.includes(false)) {
      alert("please fill everything in");
    } else {
      var testPost = {
        type: "quiz",
        creator: currentUser,
        name: typName,
        questions: [],
      };
      list.map((e) => {
        testPost.questions.push({
          question: e.typQuestion,
          answers: [e.typAnswer1, e.typAnswer2, e.typAnswer3, e.typAnswer4],
          correct: Number(e.Correct),
        });
      });
      axios.post(`${process.env.BACK_END_URL}`, testPost);
      goHome();
    }
  };
  if (logState !== null && logState == false) {
    goHome();
  }
  return (
    <div className="font-nunito bg-[url('/pipes.png')] bg-blue-300 text-white">
      <Head>
        <title>PolQuiz</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
        ></link>
      </Head>
      <User currentUser={currentUser} />
      <div className="flex flex-col gap-[25px] items-center justify-center h-[100vh]">
        <p>Creator: {currentUser}</p>
        <input
          className="outline-none no-underline text-[130px] bg-black/[.3] rounded-[30px] p-5"
          maxlength="30"
          onChange={(e) => setTypName(e.target.value)}
          placeholder="quiz name"
        ></input>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex gap-2 max-w-[2000px] min-w-[2000px] overflow-scroll outline-none text-[25px] bg-black/[.3] rounded-[30px]">
            {list.map((e, idx) => {
              return (
                <div className="w-[550px] min-w-[550px] p-[20px] border-r-2 b-white">
                  <input
                    onChange={(e) => typer(e.target.value, "typQuestion", idx)}
                    className="bg-inherit outline-none no-underline text-[30px]"
                    maxlength="50"
                    placeholder={"Question " + (idx + 1)}
                  ></input>
                  <div>
                    <input
                      onChange={(e) => typer(e.target.value, "typAnswer1", idx)}
                      className="w-[550px] bg-inherit outline-none no-underline"
                      maxlength="20"
                      placeholder="Answer 1"
                    ></input>
                    <input
                      onChange={(e) => typer(e.target.value, "typAnswer2", idx)}
                      className="w-[550px] bg-inherit outline-none no-underline"
                      maxlength="20"
                      placeholder="Answer 2"
                    ></input>
                    <input
                      onChange={(e) => typer(e.target.value, "typAnswer3", idx)}
                      className="w-[550px] bg-inherit outline-none no-underline"
                      maxlength="20"
                      placeholder="Answer 3"
                    ></input>
                    <input
                      onChange={(e) => typer(e.target.value, "typAnswer4", idx)}
                      className="w-[550px] bg-inherit outline-none no-underline"
                      maxlength="20"
                      placeholder="Answer 4"
                    ></input>
                  </div>
                  <input
                    type="number"
                    onChange={(e) => {
                      e.target.value < 1 || e.target.value > 4
                        ? (e.target.value = 1)
                        : null;
                      typer(e.target.value, "Correct", idx);
                    }}
                    placeholder="select from 1-4 for the correct answer"
                    className="w-[550px] bg-inherit"
                  ></input>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              adder();
            }}
            className="bg-black/[.3] hover:bg-gray-300 hover:text-black rounded-[10px] w-[300px] h-[100px] border-2 text-[25px] mt-[50px]"
          >
            Add more questions
          </button>
          <button
            onClick={() => {
              finisher();
            }}
            className="absolute left-0 text-[30px] bottom-0 rounded-tr-[50px] bg-yellow-200 hover:bg-yellow-300 w-[500px] h-[75px] text-[25px] text-black"
          >
            CLICK HERE WHEN YOU'RE DONE
          </button>
          <button
            onClick={() => {
              goHome();
            }}
            className="bg-red-500 h-[75px] w-[200px] rounded-tl-[50px] text-[30px] flex items-center justify-center p-5 hover:bg-red-700 absolute right-0 bottom-0"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
