import type { Metadata } from "next";
import {Montserrat,Open_Sans} from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open_sans",
  subsets: ["cyrillic"],
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "Store Practice",
  icons:{
    icon:'/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
