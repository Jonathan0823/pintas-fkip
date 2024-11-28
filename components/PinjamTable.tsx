import { getPinjamAll } from "@/lib/pinjam-action";
import StatusButton from "./StatusButton";
import { auth } from "@/auth";

export default async function PinjamTable() {
  const session = await auth();
  const data = await getPinjamAll();
  console.log(data);

  return (
    <div className="min-h-screen max-w-md w-full rounded-t-3xl border-[5px] border-red-800 mt-5 bg-[#fbf5f0] p-4">
      <div className="overflow-x-auto font-sans">
        <table className="w-full border-separate border-spacing-y-2 overflow-y-auto">
          <tbody>
            {data.map((row, index) => {
              const isEven = index % 2 === 0;
              const bgColor = isEven ? "bg-[#B2EBF2]" : "bg-[#B2F2B8]";

              return (
                <tr key={row.id} className={`${bgColor} `}>
                  <td className="p-3 w-12 rounded-xl shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-3 border-l-4 border-r-4 border-[#E5D5C5] relative rounded-xl shadow-lg">
                    <div className="font-bold text-xl">{row.namaOrmawa}</div>
                    <div className=" ml-4 text-red-800 font-bold text-xs">
                      {row.namaKegiatan}
                    </div>
                    <div className="absolute right-3 top-4 text-orange-700 font-bold text-[10px]">
                      {row.startDate.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-3 w-20 rounded-xl shadow-lg">
                    <StatusButton status={row.status} isAdmin={session?.user.isAdmin || false} id={row.id}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
