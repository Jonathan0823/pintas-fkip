"use client"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ className }: { className?: string }) => {

  const router = useRouter();
    const handleBack = () => {
        router.back();
    }

  return (
    <div className={cn(className)}>
      <button onClick={handleBack}>
        <IoMdArrowRoundBack />
      </button>
    </div>
  );
};

export default BackButton;
