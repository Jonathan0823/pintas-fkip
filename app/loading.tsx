import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed bg-[rgb(204,180,156)] inset-0 w-screen min-h-screen flex flex-col gap-4 justify-center items-center">
      <MoonLoader loading size={60} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
