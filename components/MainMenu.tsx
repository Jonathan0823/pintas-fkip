import React from "react";
import { IoSearch } from "react-icons/io5";

const MainMenu = () => {
  return (
    <div className="w-full mt-2">
      <div className="flex items-center border-2 w-full rounded-2xl p-1 bg-white">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none px-8 md:px-20  w-full rounded-2xl"
        />
        <button className="bg-[#a17659] text-white p-2 rounded-full ml-2">
          <IoSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
