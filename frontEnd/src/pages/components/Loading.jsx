import Image from "next/image";
import Head from "next/head";
export default function () {
  return (
    <div className="bg-black h-[100vh] text-green-500 font-[monospace]">
      <Head>
        <title>PolQuiz</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
        ></link>
      </Head>
      <div className="bg-white text-black p-1 border-t-2 border-x-2 flex items-center gap-2">
        <Image src={"/cmd.png"} width={25} height={25} />
        Q:\front-end\src\pages\loader.exe
      </div>
      <p className="p-1">loading...</p>
    </div>
  );
}
