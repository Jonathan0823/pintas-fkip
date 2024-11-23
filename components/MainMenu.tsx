import React from "react";
import { IoSearch } from "react-icons/io5";
import ItemsContainer from "./ItemsContainer";

const MainMenu = () => {
  return (
    <div className="w-full mt-2 px-7">
      <div className="flex items-center border-2 w-full rounded-2xl py-0 md:py-1 px-2 bg-white">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full mx-auto rounded-2xl" // Adjust width and add horizontal margin
        />
        <button className="bg-[#86271c] text-white p-2 rounded-full ">
          <IoSearch size={20} />
        </button>
      </div>
      <div>
        <ItemsContainer />
      </div>
    </div>
  );
};

export default MainMenu;
