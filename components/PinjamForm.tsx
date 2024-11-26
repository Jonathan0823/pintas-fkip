import { useState } from "react"
import { CalendarIcon } from 'lucide-react'

export default function PinjamForm() {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  return (
    <div className="min-h-screen bg-[#F5E6D3] p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="bg-[#8B2323] text-white text-center py-4 px-6">
          <h1 className="text-2xl font-semibold">ISI BIODATA</h1>
        </div>
        <div className="p-6">
          <p className="text-[#8B2323] mb-4">Lengkapi data-data berikut ini:</p>
          <form className="space-y-4">
            <div className="flex">
              <label className="w-1/3 text-[#8B2323]">Nama</label>
              <span className="w-8 text-center">:</span>
              <input 
                type="text" 
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-[#8B2323]"
                defaultValue="YULIA AGNESIA"
              />
            </div>
            <div className="flex">
              <label className="w-1/3 text-[#8B2323]">Nama Himpunan</label>
              <span className="w-8 text-center">:</span>
              <input 
                type="text" 
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-[#8B2323]"
                defaultValue="ASEED"
              />
            </div>
            <div className="flex">
              <label className="w-1/3 text-[#8B2323]">Nomor Telepon</label>
              <span className="w-8 text-center">:</span>
              <input 
                type="tel" 
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-[#8B2323]"
                defaultValue="08572234345"
              />
            </div>
            <div className="flex">
              <label className="w-1/3 text-[#8B2323]">Nama Kegiatan</label>
              <span className="w-8 text-center">:</span>
              <input 
                type="text" 
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-[#8B2323]"
              />
            </div>
            <div>
              <label className="block text-[#8B2323] mb-2">Berapa lama peminjaman :</label>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2">Dari :</span>
                  <div className="relative">
                    <input
                      type="date"
                      className="pl-8 pr-2 py-1 border rounded focus:outline-none focus:border-[#8B2323]"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Sampai :</span>
                  <div className="relative">
                    <input
                      type="date"
                      className="pl-8 pr-2 py-1 border rounded focus:outline-none focus:border-[#8B2323]"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#8B2323] text-sm mb-2">Silahkan upload file surat peminjaman dibawah ini:</p>
              <p className="text-[#FF0000] text-xs mb-2">*Wajib menyertakan surat peminjaman</p>
            </div>
          </form>
        </div>
        <div className="px-6 pb-6">
          <button 
            type="submit" 
            className="w-full bg-[#8B2323] hover:bg-[#722323] text-white py-2 rounded-md transition duration-300"
          >
            UPLOAD FILE
          </button>
        </div>
      </div>
    </div>
  )
}

