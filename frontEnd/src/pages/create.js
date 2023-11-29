import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function create() {
  // Current User
  const [CurrentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(localStorage.getItem("currentUser"));
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
  // Go Home
  const router = useRouter();
  const goHome = () => {
    router.push(`/`);
  };
  // Finisher
  const finisher = () => {
    var testPost = {
      type: "quiz",
      creator: CurrentUser,
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
    axios.post(`http://localhost:2007/`, testPost);
  };
  return (
    <div className="m-2">
      <button
        onClick={() => {
          goHome();
        }}
        className="bg-gray-200 hover:bg-gray-300"
      >
        cancel
      </button>
      <p className="text-gray-400">Creator: {CurrentUser}</p>
      <input
        onChange={(e) => setTypName(e.target.value)}
        placeholder="quiz name"
      ></input>
      <div className="flex flex-col gap-2">
        {list.map((e, idx) => {
          return (
            <div className="border-2 w-[400px]">
              <input
                onChange={(e) => typer(e.target.value, "typQuestion", idx)}
                placeholder={"Question " + (idx + 1)}
              ></input>
              <div>
                <input
                  onChange={(e) => typer(e.target.value, "typAnswer1", idx)}
                  placeholder="Answer 1"
                ></input>
                <input
                  onChange={(e) => typer(e.target.value, "typAnswer2", idx)}
                  placeholder="Answer 2"
                ></input>
                <input
                  onChange={(e) => typer(e.target.value, "typAnswer3", idx)}
                  placeholder="Answer 3"
                ></input>
                <input
                  onChange={(e) => typer(e.target.value, "typAnswer4", idx)}
                  placeholder="Answer 4"
                ></input>
              </div>
              <input
                type="number"
                onChange={(e) => {
                  e.target.value < 1 || e.target.value > 4
                    ? (e.target.value = 0)
                    : null;
                  typer(e.target.value, "Correct", idx);
                }}
                placeholder="select from 1-4 for the correct answer"
                className="w-[300px]"
              ></input>
            </div>
          );
        })}
        <button
          onClick={() => {
            adder();
          }}
          className="bg-gray-200 hover:bg-gray-300 w-[400px]"
        >
          add more questions
        </button>
        <button
          onClick={() => {
            finisher();
            goHome();
          }}
          className="bg-gray-200 hover:bg-gray-300 w-[400px]"
        >
          done
        </button>
      </div>
    </div>
  );
}
