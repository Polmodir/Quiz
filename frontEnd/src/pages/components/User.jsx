import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
export default function ({ currentUser }) {
  const router = useRouter();
  const logIn = () => {
    router.push(`login`);
  };
  return (
    <div className="flex items-center gap-5 bg-black/[.3] p-2 fixed w-[100%] text-white tracking-[1px]">
      <Image src={"/macmade2.gif"} width={75} height={50} />
      <p>Current User: {currentUser}</p>
      <button
        onClick={() => {
          localStorage.setItem("loggedIn", false);
          logIn();
        }}
        className="bg-red-400 p-1 hover:bg-red-500"
      >
        Log Out
      </button>
    </div>
  );
}
