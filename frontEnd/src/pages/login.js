import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Loading from "./components/Loading";
import Head from "next/head";

export default function Login() {
  const [page, setPage] = useState("logIn");
  const [pin, setPin] = useState(false);
  // Fetching data
  const [data, setData] = useState();
  async function getData() {
    try {
      const res = await axios.get(`${process.env.BACK_END_URL}`);
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
  const logInFunction = async () => {
    const res = await axios.post(`${process.env.BACK_END_URL}login`, {
      email: list.logInMail,
      password: list.logInPass,
    });
    if (res.data.status == true) {
      console.log("its done");
      localStorage.setItem("loggedIn", true);
      setLogState(true);
      console.log(res);
      localStorage.setItem("currentUser", res.data.user.email);
      setCurrentUser(res.data.user.email);
      goHome();
    } else {
      console.log("its not done");
    }
  };
  // Submit new account function
  const [code, setCode] = useState(0);
  const submit = async () => {
    setPin(true);
    try {
      const res = await axios.put(`${process.env.BACK_END_URL}`, {
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
  // Creating account function with email code checker
  const createAccount = async () => {
    console.log(code, list.pin);
    if (code == list.pin) {
      await axios.post(`${process.env.BACK_END_URL}`, {
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
    return <Loading />;
  }
  if (logState !== null && logState == true) {
    goHome();
  }
  if (page == "logIn") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-[100vh] bg-[url('/background2.gif')] text-blue-100 tracking-[8px] font-[serif]">
        <Head>
          <title>Login</title>
          <link
            rel="icon"
            href="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
          ></link>
        </Head>
        <Image src={"/mrrobot.png"} width={467.25} height={458.75} />
        <p className="text-red-900 text-[13px] font-[monospace]">
          literally you logging in rn
        </p>
        <p className="text-4xl tracking-[20px] mb-[100px]"> LOG IN</p>
        <div className="flex flex-col items-center">
          <p className="font-[monospace]">ENTER YOUR EMAIL</p>
          <input
            onChange={(e) => typer(e.target.value, "logInMail")}
            className="outline-none decoration-none text-black tracking-[-1px] w-[275px]"
          ></input>
        </div>
        <div className="flex flex-col items-center">
          <p className="tracking-[5px] font-[monospace]">ENTER YOUR PASSWORD</p>
          <input
            type="password"
            onChange={(e) => typer(e.target.value, "logInPass")}
            className="outline-none decoration-none text-black tracking-[-1px] w-[275px]"
          ></input>
        </div>
        <button
          onClick={() => {
            logInFunction();
          }}
          className="border-2 border-blue-100 tracking-[8px] hover:bg-green-400 pl-[10px] font-[monospace]"
        >
          submit
        </button>
        <button
          onClick={() => setPage("Creating")}
          className="border-2 border-blue-100 pl-[10px] tracking-[8px] hover:bg-blue-400 font-[monospace]"
        >
          Create a new account
        </button>
      </div>
    );
  } else if (page == "Creating") {
    return (
      <div className="flex flex-col gap-2 items-center justify-center bg-[url('/background3.gif')] h-[100vh] font-[serif]">
        <Head>
          <title>Create</title>
          <link
            rel="icon"
            href="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
          ></link>
        </Head>
        <div className="flex flex-col items-center tracking-[8px] text-sm text-yellow-200 pb-20">
          <Image
            src={"/god.webp"}
            width={576.875}
            height={485}
            className="m-[-50px]"
          />
          <p>Genesis 1:27</p>
          <p>So God created man in His own image,</p>
          <p> in the image of God he created him, </p>
          <p> male and female He created them. </p>
        </div>
        {pin ? (
          <div className="flex flex-col gap-2 items-center">
            <input
              className="outline-none decoration-none w-[250px] flex pl-2"
              onChange={(e) => typer(e.target.value, "pin")}
              placeholder="enter the pin code sent to your email"
            ></input>
            <button
              onClick={() => {
                createAccount();
              }}
              className="font-[monospace] tracking-[8px] border-2 pl-2 w-[120px] text-white hover:bg-white hover:text-black"
            >
              enter
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <input
              onChange={(e) => typer(e.target.value, "createMail")}
              className="outline-none decoration-none pl-1"
              placeholder="email"
            />
            <input
              onChange={(e) => typer(e.target.value, "createPass")}
              className="outline-none decoration-none pl-1"
              placeholder="password"
            />
            <button
              className="tracking-[8px] border-2 w-[100px] pl-2 font-[monospace] text-white hover:bg-yellow-400 hover:text-black"
              onClick={() => submit()}
            >
              enter
            </button>
          </div>
        )}
        <button
          onClick={() => {
            setPage("logIn");
            setPin(false);
          }}
          className="tracking-[8px] border-2 pl-2 w-[120px] font-[monospace] text-white hover:bg-red-400 hover:text-black"
        >
          cancel
        </button>
      </div>
    );
  }
}
