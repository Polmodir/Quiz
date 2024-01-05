import Image from "next/image";
export default function () {
  return (
    <div className="bg-black h-[100vh] text-green-500 font-[monospace]">
      <div className="bg-white text-black p-1 border-t-2 border-x-2 flex items-center gap-2">
        <Image src={"/cmd.png"} width={25} height={25} />
        Q:\front-end\src\pages\loader.exe
      </div>
      <p className="p-1">loading...</p>
    </div>
  );
}
