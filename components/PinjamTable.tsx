import { Search } from 'lucide-react'
import Image from "next/image"

export default function PinjamTable() {
  const rows = [
    { id: 1, name: "ASEED", activity: "SPECTASEED", date: "12-07-2024" },
    { id: 2, name: "HIMAPMTK", activity: "NATIONAL SEMINAR", date: "05-08-2024" },
    ...Array(6).fill(null).map((_, index) => ({ id: index + 3, name: "", activity: "", date: "" }))
  ]
  
  return (
    <div className="min-h-screen bg-[#E5D5C5] p-4">
      <div className="max-w-3xl mx-auto bg-[#E5D5C5] rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button className="text-[#8B2323]">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path 
                fill="currentColor" 
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center flex-grow">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Logo"
              width={60}
              height={60}
              className="mb-2"
            />
            <h1 className="text-2xl font-bold text-white text-center">
              ALUR SURAT PEMINJAMAN
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-grow p-2 rounded-md border border-gray-300"
            placeholder="Search..."
          />
          <button className="bg-[#8B2323] p-2 rounded-md">
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {rows.map((row, index) => {
                const isEven = index % 2 === 0
                const bgColor = isEven ? 'bg-[#B2EBF2]' : 'bg-[#B2F2B8]'
                
                return (
                  <tr key={row.id} className={`${bgColor}`}>
                    <td className="p-3 w-12 rounded-l-lg">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold">
                        {row.id}
                      </div>
                    </td>
                    <td className="p-3 border-l-4 border-r-4 border-[#E5D5C5]">
                      <div className="font-bold">{row.name}</div>
                      <div className="text-sm text-gray-600">{row.activity}</div>
                    </td>
                    <td className="p-3 text-sm text-gray-600 text-right border-r-4 border-[#E5D5C5]">
                      {row.date}
                    </td>
                    <td className="p-3 w-12 rounded-r-lg">
                      <div className="w-8 h-8 border-2 border-dashed border-gray-400 rounded-full ml-auto" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

