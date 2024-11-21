import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const HomeDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-[#f8e6da] mt-3 text-[#b49f8b] px-6 tracking-widest relative py-3 font-bold rounded-full border border-black">
          SIGN UP
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#f8e6da] text-[#b49f8b] border-2 border-[#5a4f45]">
        <DropdownMenuItem className="border-b border-[#5a4f45]">
          <Link href="/signup/admin">Admin</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/signup/user">Himpunan</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HomeDropDown;
