import SessionProvider from "@/utils/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Boilerplate with MongoDb",
  description: "Next Boilerplate with MongoDb | Author: Jobayer Hossain",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          <main id="main-content">{children}</main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
