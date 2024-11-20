"use client"
import { cn } from "@/lib/utils";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ className }: { className?: string }) => {
    const handleBack = () => {
        window.history.back();
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
