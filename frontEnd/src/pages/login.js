import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

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
  if (logState !== null && logState == true) {
    goHome();
  }
  if (page == "logIn") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-[100vh] bg-[url('/background2.gif')] text-blue-100 tracking-[8px] font-mono">
        <Image src={"/mrrobot.png"} width={467.25} height={458.75} />
        <p className="text-red-900 text-[13px]">
          литералли юү логгинг ин раят наув
        </p>
        <p className="text-4xl tracking-[20px] mb-[100px]"> LOG IN</p>
        <div className="flex flex-col items-center">
          <p>ENTER YOUR EMAIL</p>
          <input
            onChange={(e) => typer(e.target.value, "logInMail")}
            className="outline-none decoration-none text-black tracking-[-1px] w-[275px]"
          ></input>
        </div>
        <div className="flex flex-col items-center">
          <p className="tracking-[5px]">ENTER YOUR PASSWORD</p>
          <input
            onChange={(e) => typer(e.target.value, "logInPass")}
            className="outline-none decoration-none text-black tracking-[-1px] w-[275px]"
          ></input>
        </div>
        <button
          onClick={() => {
            logInFunction();
          }}
          className="border-2 border-blue-100 flex items-center justify-center tracking-[8px] hover:bg-blue-400"
        >
          submit
        </button>
        <button
          onClick={() => setPage("Creating")}
          className=" hover:bg-green-300 tracking-[8px]"
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
