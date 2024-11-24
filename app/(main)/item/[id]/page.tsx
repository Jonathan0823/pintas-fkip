import { GetItem } from "@/lib/GetItems";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const item = await GetItem(id);
  console.log(item);

  
  return (
    <div>
      <div className="text-white text-2xl md:text-3xl absolute p-2 top-16 right-5 rounded-full bg-[#a17659] shadow-md border-[#997c5c]">
        <Link href="home/cart">
          <IoCartOutline className="transition-transform -rotate-12 hover:rotate-0" />
        </Link>
      </div>
      {id}
    </div>
  );
};

export default Page;
