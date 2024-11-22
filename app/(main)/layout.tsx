import MenuDropdown from "@/components/MenuDropdown";
import Provider from "@/utils/Provider";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";

const theSeasons = localFont({
  src: "../font/theseasons.otf",
  display: "swap",
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${theSeasons.className} antialiased`}>
      <div className="w-full bg-[rgb(204,180,156)]">
        <div className="md:max-w-md mx-auto">
          <div
            style={{
              backgroundImage: "url(/bg/bg.png)",
              backgroundSize: "cover",
              height: "100vh",
              width: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full flex flex-col items-center relative"
          >
            <div className="text-[#997c5c] text-4xl md:text-5xl absolute top-16 left-5">
              <MenuDropdown />
            </div>
            <SessionProvider>
              <Provider>{children}</Provider>
            </SessionProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
