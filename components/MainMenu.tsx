import React, { Suspense } from "react";
import ItemsContainer from "./ItemsContainer";
import Loading from "@/app/loading";

const MainMenu = ({ query }: { query?: string }) => {
  return (
    <div className="w-full mt-2 px-7">
      <Suspense fallback={<Loading />}>
        <div>
          <ItemsContainer query={query || ""} />
        </div>
      </Suspense>
    </div>
  );
};

export default MainMenu;
