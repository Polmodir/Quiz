import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [page, setPage] = useState("logIn");
  const [pin, setPin] = useState(false);
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
    createMail: "",
    createPass: "",
    pin: "",
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
        goHome();
      } else {
        alert("wrong email or pass");
      }
    });
  };
  console.log(currentUser);
  // Submit new account function
  const [code, setCode] = useState(0);
  const submit = async () => {
    setPin(true);
    try {
      const res = await axios.put("http://localhost:2007/", {
        gmail: list.createMail,
      });
      setCode(res.data.code);
    } catch (error) {
      console.error(error);
    }
  };
  // Changing the page
  const router = useRouter();
  const goHome = () => {
    router.push(`/`);
  };
  const createAccount = async () => {
    console.log(code, list.pin);
    if (code == list.pin) {
      await axios.post("http://localhost:2007/", {
        type: "user",
        email: list.createMail,
        password: list.createPass,
      });
      alert("done");
      getData();
      goHome();
    } else {
      alert("wrong lol");
    }
  };
  if (data == null) {
    return <div>loading...</div>;
  }
  if (page == "logIn") {
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
        <button
          onClick={() => setPage("Creating")}
          className="bg-green-200 hover:bg-green-300"
        >
          or Create a new account
        </button>
      </div>
    );
  } else if (page == "Creating") {
    return (
      <div className="flex flex-col items-center">
        {pin ? (
          <div>
            <input
              className="w-[270px]"
              onChange={(e) => typer(e.target.value, "pin")}
              placeholder="enter the pin code sent to your email"
            ></input>
            <button
              onClick={() => {
                createAccount();
              }}
            >
              enter
            </button>
          </div>
        ) : (
          <div>
            <input
              onChange={(e) => typer(e.target.value, "createMail")}
              placeholder="email"
            />
            <input
              onChange={(e) => typer(e.target.value, "createPass")}
              placeholder="password"
            />
            <button onClick={() => submit()}>enter</button>
          </div>
        )}
        <button
          onClick={() => {
            setPage("logIn");
            setPin(false);
          }}
        >
          cancel
        </button>
      </div>
    );
  }
}
