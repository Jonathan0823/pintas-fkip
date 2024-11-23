import AddItems from "@/components/AddItems";
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
          className="w-full flex flex-col items-center relative overflow-hidden bg-fixed md:bg-local"
        >
          <AddItems />
        </div>
      </div>
    </div>
  );
};

export default Page;
