import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/chat-widget";

export const metadata: Metadata = {
  title: "Rashi — Product & Visual Designer",
  description: "Moving rectangles around (professionally)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}