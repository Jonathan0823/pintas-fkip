import MenuDropdown from "@/components/MenuDropdown";
import { EdgeStoreProvider } from "@/lib/edgestore";
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
            className="w-full flex flex-col items-center relative overflow-hidden bg-fixed md:bg-local"
          >
            <div className="text-[#997c5c] text-4xl md:text-5xl absolute top-12 md:top-16 left-5">
              <MenuDropdown />
            </div>
            <SessionProvider>
              <Provider>
                <EdgeStoreProvider>{children}</EdgeStoreProvider>
              </Provider>
            </SessionProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
