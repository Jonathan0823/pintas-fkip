import Image from "next/image";

const fakeItems = [
  { id: 1, name: "Layar Proyektor", image: "/userprofile.jpg", stock: 10, initialStock: 10 },
  { id: 2, name: "Dudukan Bendera", image: "/userprofile.jpg", stock: 10, initialStock: 10 },
  { id: 3, name: "Meja Dosen", image: "/userprofile.jpg", stock: 10, initialStock: 10 },
  { id: 4, name: "Sound System", image: "/userprofile.jpg", stock: 5, initialStock: 5 },
];

const ItemsContainer = async () => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
    {fakeItems.map((item) => (
      <div key={item.id} className="flex flex-col items-center space-y-2">
        <div className="bg-[#9d7c58] p-1 rounded-2xl">
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            className="w-32 rounded-xl"
          />
        </div>
        <div className="bg-[#9d7c58] px-3 py-1 rounded-full font-sans">
          <div className="flex justify-around min-h-6 items-center text-[7px] text-white">
            <span>{item.name}</span>
            <span>{item.stock}/{item.initialStock}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default ItemsContainer;
