import { MdKeyboardCommandKey } from "react-icons/md";
export default function Promotion() {
  return (
    <>
      <div className="bg-[#18181B] h-screen w-full p-5 ">
        <h1 className="flex items-center gap-3">
          <span className="text-3xl">
            {" "}
            <MdKeyboardCommandKey />
          </span>
          <span className="text-[1.5rem] font-bold">Job Board</span>
        </h1>
      </div>
    </>
  );
}
