import { ImSpinner8 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="fixed bg-[rgb(204,180,156)] inset-0 w-screen min-h-screen flex flex-col gap-4 justify-center items-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center animate-spin">
        <ImSpinner8 className="w-10 h-10" />
      </div>
    </div>
  );
};

export default Loading;
