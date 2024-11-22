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
      {/* Dropdown trigger (menu icon) */}
      <DropdownMenuTrigger className="p-2 rounded-full bg-white shadow-md">
        <IoMenu size={24} />
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent
        side="bottom" // Ensures the dropdown opens to the right
        align="start" // Aligns it to the top of the button
        className="flex flex-col gap-3 bg-white p-1 shadow-md rounded-xl min-w-4 border border-gray-200"
      >
        {/* Dropdown items */}
        <DropdownMenuItem className="flex justify-center items-center !p-2 hover:bg-gray-100 rounded-md">
        <Link href="/home">
          <IoHomeOutline />
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center items-center !p-2 hover:bg-gray-100 rounded-md">
          <Link href="/user">
            <IoPersonOutline className="text-xl" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center items-center !p-2 hover:bg-gray-100 rounded-md">
          <IoSettingsOutline size={24} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center items-center !p-2 hover:bg-gray-100 rounded-md">
          <IoSearchOutline size={24} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
