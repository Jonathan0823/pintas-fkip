import AddItems from "@/components/AddItems";
import BackButton from "@/components/BackButton";
import React from "react";

const Page = () => {
  return (
    <div className="w-full bg-[rgb(204,180,156)]">
      <div className="md:max-w-md mx-auto">
        <div
          style={{
            backgroundImage: "url(/bg/bg.png)",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full flex flex-col items-center relative overflow-y-auto bg-fixed md:bg-local"
        >
          <BackButton className="text-[#997c5c] text-4xl md:text-5xl absolute top-0 left-5"/>
          <AddItems />
        </div>
      </div>
    </div>
  );
};

export default Page;
