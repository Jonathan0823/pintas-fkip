import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

export const metadata: Metadata = {
  title: "Pintas FKIP",
  description: "Generated by create next app",
};

const theSeasons = localFont({
  src: './font/theseasons.otf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${theSeasons.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
