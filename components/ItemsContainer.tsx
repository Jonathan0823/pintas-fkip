import { GetItems } from "@/lib/item-action";
import Image from "next/image";
import Link from "next/link";
import SearchButton from "./SearchButton";

const ItemsContainer = async ({ query }: { query: string }) => {
  const items = await GetItems(query);

  return (
    <div className="w-full">
        <SearchButton name="home" />
      <div className="grid grid-cols-4 gap-2 mt-4 overflow-y-scroll w-full">
        {items.length === 0 ? (
          <div className="col-span-4 flex justify-center items-center text-center text-white">
            <h1>No items found</h1>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-col items-center space-y-2">
              <Link href={`/item/${item.id}`}>
                <div className="bg-[#9d7c58] p-1 rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-32 rounded-xl"
                  />
                </div>
              </Link>
              <div className="bg-[#9d7c58] px-3 py-1 rounded-full font-sans">
                <div className="flex justify-between min-w-12 md:min-w-16 min-h-6 items-center text-[7px] text-white">
                  <span>{item.name}</span>
                  <span>
                    {item.stock}/{item.initialStock}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemsContainer;
