import { auth } from "@/auth";
import EditItems from "@/components/EditItems";
import ItemComp from "@/components/ItemComp";
import { GetItem } from "@/lib/item-action";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

type Params = Promise<{ id: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const item = await GetItem(id);

  const session = await auth();
  console.log(session);

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
          {!session?.user.isAdmin && (
            <Image
              src="/unsikalogo.png"
              alt="unsika"
              width={100}
              height={100}
              className="absolute top-2 md:w-20 w-14"
            />
          )}

          <div className="text-white text-2xl md:text-3xl absolute p-2 top-12 md:top-16 right-5 rounded-full bg-[#a17659] shadow-md border-[#997c5c]">
            <Link href="home/cart">
              <IoCartOutline className="transition-transform -rotate-12 hover:rotate-0" />
            </Link>
          </div>
          {session?.user.isAdmin && item && <EditItems item={item} />}
          {!session?.user.isAdmin && item && <ItemComp item={item} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
