import type { Metadata } from "next";
import "./globals.css";
import { HawkeyeChatbot } from "../components/Chatbot/HawkeyeChatbot";

export const metadata: Metadata = {
  title: "Hawkeye - Financial Fraud Detection Platform",
  description: "Advanced financial fraud detection and analytics platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <HawkeyeChatbot />
      </body>
    </html>
  );
}
