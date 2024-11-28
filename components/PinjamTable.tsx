
export default function PinjamTable() {
  const rows = [
    { id: 1, name: "ASEED", activity: "SPECTASEED", date: "12-07-2024" },
    { id: 2, name: "HIMAPMTK", activity: "NATIONAL SEMINAR", date: "05-08-2024" },
    ...Array(6).fill(null).map((_, index) => ({ id: index + 3, name: "", activity: "", date: "" }))
  ]
  
  return (
    <div className="min-h-screen bg-[#E5D5C5] p-4">
      <div className="max-w-3xl mx-auto bg-[#E5D5C5] rounded-lg p-4"></div>
    

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
  )
}

