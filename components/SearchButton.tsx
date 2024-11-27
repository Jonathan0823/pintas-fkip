"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchButton = ({name}: {name: string}) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/${name}?search=${encodeURIComponent(keyword)}`);
  };

  return (
      <div className="flex items-center border-2 w-72 md:w-80 rounded-2xl mx-auto py-0 md:py-1 px-2 bg-white">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {setKeyword(e.target.value)
            if (e.target.value === "") {
              router.push(`/${name}`);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search..."
          className="outline-none w-full mx-auto rounded-2xl"
        />
        <button
          className="bg-[#86271c] text-white p-2 rounded-full "
          onClick={handleSearch}
        >
          <IoSearch size={20} />
        </button>
      </div>
  );
};

export default SearchButton;
