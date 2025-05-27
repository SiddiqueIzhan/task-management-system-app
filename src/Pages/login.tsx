import { signInWithGoogle } from "../Config/firebase";
import { PiNotepad } from "react-icons/pi";

const Login = () => {
  return (
    <div className="page login">
      <div className="w-[295px] md:w-[365px] flex flex-col items-center md:items-start position z-10">
        <div className="flex items-center gap-1 mb-[7px] text-[#7B1984]">
          <PiNotepad className=" text-3xl" />
          <h3 className="font-bold text-[26px]">TaskBuddy</h3>
        </div>
        <p className="text-center md:text-left font-medium text-xs">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>
        <button
          onClick={signInWithGoogle}
          className="w-11/12 md:w-full h-12 md:h-[60px] rounded-[18px] bg-[#292929] flex items-center justify-center mt-[31px] duration-200 hover:border-yellow-500 hover:border-2"
        >
          <div className="flex items-center gap-3">
            <img src="/Images/google.svg" alt="google" />
            <span className="text-base text-white md:text-2xl font-bold cursor-pointer">
              Continue with Google
            </span>
          </div>
        </button>
      </div>
      <img
        src="/Images/circles_bg.svg"
        alt="circle"
        className="hidden md:block absolute top-12 right-0"
      />
      <img
        src="/Images/Task list view 3.svg"
        alt="task view"
        className="hidden md:block absolute right-0 top-[95px]"
      />
      <img
        src="/Images/mobile_bg_onboard.svg"
        alt="circles"
        className="w-screen h-screen block md:hidden absolute top-0 left-0"
      />
    </div>
  );
};

export default Login;
