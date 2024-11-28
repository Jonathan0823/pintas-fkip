"use client";
import { useState } from "react";
import { PiSpinnerGap } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { changePinjamStatus } from "@/lib/pinjam-action";
import toast, { Toaster } from "react-hot-toast";

const StatusButton = ({
  status,
  isAdmin,
  id,
}: {
  status: string;
  isAdmin: boolean;
  id: string;
}) => {
  const [data, setData] = useState(status);

  const handleClick = async () => {
    if(data === "completed") return;
    if (isAdmin) {
      toast.loading("Mengubah Status...");
      let newStatus = data;
      try {
        if (data === "pending") {
          newStatus = "approved";
        } else if (data === "approved") {
          newStatus = "completed";
        }
        setData(newStatus); // Optimistically update the UI
        await changePinjamStatus(id, newStatus);
        toast.dismiss();
        toast.success("Berhasil mengubah status");
      } catch {
        // Revert the optimistic update if the request fails
        setData(status);
        toast.error("Gagal mengubah status");
      }
    } else {
      return;
    }
  };

  return (
    <div
      className="flex items-center justify-center h-full w-full"
      onClick={handleClick}
    >
      <Toaster />
      {data === "pending" && (
        <PiSpinnerGap className="animate-spin text-blue-600 text-3xl" />
      )}
      {data === "approved" && (
        <h1 className="text-xl font-bold font-sans">accepted</h1>
      )}
      {data === "completed" && <FaCheck className=" text-3xl text-green-500" />}
    </div>
  );
};

export default StatusButton;
