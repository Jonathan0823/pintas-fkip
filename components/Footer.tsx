import { FaRegCopyright } from "react-icons/fa";
const Footer = ({ color }: { color: string }) => {
  if (!color) color = "transparent";

  return (
    <>
      <div className="h-10"></div>
      <div
        className={`flex gap-3 w-full text-white md:max-w-md justify-center items-center py-2 fixed bottom-0`}
        style={{ backgroundColor: color }}
      >
        <FaRegCopyright />
        <p>PINTAS BY GROUP 5</p>
      </div>
    </>
  );
};

export default Footer;
