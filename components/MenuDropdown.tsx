import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoSearchOutline,
} from "react-icons/io5";

const MenuDropdown = () => {
  return (
    <DropdownMenu>
      {/* The trigger button will be hidden when dropdown is open */}
      <DropdownMenuTrigger className="p-2 rounded-full bg-white shadow-md border-[#997c5c]">
        <IoMenu className="text-3xl" />
      </DropdownMenuTrigger>

      {/* Dropdown content */}

      <DropdownMenuContent
        side="bottom"
        align="start" // Aligns it to the left of the button
        className="flex flex-col gap-3 border-2 border-[#997c5c] bg-white p-1 shadow-md rounded-xl min-w-4 absolute"
      >
        {/* Dropdown items */}
        <DropdownMenuItem className="flex justify-center text-[#997c5c] items-center !p-2 hover:bg-gray-100 rounded-md">
          <Link href="/home">
            <IoHomeOutline className="text-xl" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center text-[#997c5c] items-center !p-2 hover:bg-gray-100 rounded-md">
          <Link href="/user">
            <IoPersonOutline className="text-xl" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center text-[#997c5c] items-center !p-2 hover:bg-gray-100 rounded-md">
          <IoSettingsOutline size={24} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center text-[#997c5c] items-center !p-2 hover:bg-gray-100 rounded-md">
          <IoSearchOutline size={24} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
