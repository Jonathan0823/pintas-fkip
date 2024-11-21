import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Pintas FKIP",
  description: "Sarana Peminjaman Fasilitas FKIP Unsika",
};

const theSeasons = localFont({
  src: "./font/theseasons.otf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${theSeasons.className} antialiased`}>
        <div className="w-full bg-[rgb(204,180,156)]">
          <div className="md:max-w-md mx-auto">
            <SessionProvider>{children}</SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
