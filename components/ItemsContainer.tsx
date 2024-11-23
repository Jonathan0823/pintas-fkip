import Image from "next/image";

const fakeItems = [
  { id: 1, name: "Item 1", image: "", stock: 10, initialStock: 10 },
  { id: 2, name: "Item 2", image: "", stock: 10, initialStock: 10 },
  { id: 3, name: "Item 3", image: "", stock: 10, initialStock: 10 },
  { id: 4, name: "Item 4", image: "", stock: 5, initialStock: 5 },
  { id: 5, name: "Item 5", image: "", stock: 58, initialStock: 58 },
];

const ItemsContainer = async () => {
  return (
    <div className="grid grid-cols-4 mt-4">
      {fakeItems.map((item) => (
        <div key={item.id} className="p-1 font-sans">
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            className="w-32 rounded-2xl p-2 bg-[#9d7c58]"
          />
          <div className="flex justify-around mt-2 bg-[#9d7c58] text-[10px] text-white rounded-full">
            <p>
              {item.name}
            </p>
            <p>{item.stock}/{item.initialStock}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsContainer;
