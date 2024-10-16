import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Header from "@/components/header";
import Footer from "@/components/footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const notoSans = localFont({
  src: "./fonts/NotoSansKR-VariableFont_wght.ttf",
  variable: "--font-noto-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Animal Adoption Network",
  description: "A platform to find your new best friend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${notoSans.variable} antialiased`}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
