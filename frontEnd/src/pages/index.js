import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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

  // Typer
  const [list, setList] = useState({
    logInMail: "",
    logInPass: "",
  });
  const typer = (x, utga) => {
    Object.keys(list).map((y) => {
      if (utga == y) {
        list[y] = x;
        console.log(list[y]);
      }
    });
  };
  // Log In function
  const [logState, setLogState] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logStateFrom = localStorage.getItem("loggedIn");
      setLogState(logStateFrom === "true");
      setCurrentUser(localStorage.getItem("currentUser"));
    }
  }, []);
  const logInFunction = () => {
    data.users.map((x) => {
      if (x.email == list.logInMail && x.password == list.logInPass) {
        localStorage.setItem("loggedIn", true);
        setLogState(true);
        localStorage.setItem("currentUser", list.logInMail);
        setCurrentUser(list.logInMail);
      } else {
        alert("wrong email or pass");
      }
    });
  };
  console.log(currentUser);
  // Changing the page
  const router = useRouter();
  const startQuiz = (quizId) => {
    router.push(`/quiz?Id=${quizId}`);
  };
  const createQuiz = () => {
    router.push(`/create`);
  };
  // Delete function
  const deleter = (id) => {
    axios.delete(`http://localhost:2007/${id}`);
  };
  // Loading
  if (data == null) {
    return <div>loading...</div>;
  }
  // Log in page
  if (logState == false) {
    return (
      <div className="flex flex-col items-center">
        <p> log in</p>
        <input
          onChange={(e) => typer(e.target.value, "logInMail")}
          className="border-2"
          placeholder="gmail"
        ></input>
        <input
          onChange={(e) => typer(e.target.value, "logInPass")}
          className="border-2"
          placeholder="password"
        ></input>
        <button
          onClick={() => {
            logInFunction();
          }}
          className="bg-blue-200 hover:bg-blue-300"
        >
          submit
        </button>
        <button className="bg-green-200 hover:bg-green-300">
          or Create a new account
        </button>
      </div>
    );
  }
  console.log(logState);
  // Logged in page
  if (logState == true) {
    return (
      <div className="flex flex-col gap-10 m-2">
        <div className="flex gap-5">
          <p>Current User: {currentUser}</p>
          <button
            onClick={() => {
              localStorage.setItem("loggedIn", false);
              setLogState(false);
            }}
            className="bg-red-400 p-1 hover:bg-red-500"
          >
            Log Out
          </button>
        </div>
        <div className="flex gap-2">
          Quizes:
          {data.quiz.map((quizes) => {
            return (
              <div className="border-2 border-black">
                {quizes.name}
                {quizes.creator == currentUser ? (
                  <div>
                    <p>creator: you</p>
                    <button
                      className="bg-red-200 hover:bg-red-300"
                      onClick={() => {
                        deleter(quizes._id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                ) : (
                  <p>creator: {quizes.creator}</p>
                )}
                <button
                  className="bg-gray-200 hover:bg-gray-300"
                  onClick={() => {
                    startQuiz(quizes._id);
                  }}
                >
                  Start Quiz
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            createQuiz();
          }}
          className="bg-gray-200 hover:bg-gray-300"
        >
          Create new quiz
        </button>
      </div>
    );
  }
}
