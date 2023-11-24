import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  // const logState = localStorage.getItem("loggedIn");
  // const [logState, setLogState] = useState(false);
  // useEffect(() => {
  //   localStorage.setItem("loggedIn", false);
  //   const logStateFrom = localStorage.getItem("loggedIn");
  //   setLogState(logStateFrom);
  // }, []);
  const logState = true;
  const logInFunction = () => {
    data.users.map((x) => {
      if (x.email == list.logInMail && x.password == list.logInPass) {
        localStorage.setItem("loggedIsn", true);
      } else {
        alert("wrong email or pass");
      }
    });
  };

  // Changing the page
  const router = useRouter();
  const startQuiz = (quizId) => {
    router.push(`/quiz?Id=${quizId}`);
  };

  // Loading and Main Web
  if (data == null) {
    return <div>loading...</div>;
  } else if (logState == false) {
    return (
      <div className="flex flex-col items-center">
        log in
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
        <button onClick={logInFunction} className="active:bg-black">
          submit
        </button>
      </div>
    );
  } else if (logState == true) {
    return (
      <div className="flex gap-2 m-2">
        Quizes:
        {data.quiz.map((quizes) => {
          return (
            <div className="border-2 border-black">
              {quizes.name}
              <p>creator: {quizes.creator}</p>
              <button
                className="bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  startQuiz(quizes.id);
                }}
              >
                Start Quiz
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
