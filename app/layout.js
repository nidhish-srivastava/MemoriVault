import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reminx",
  description: "Unlock the door to your memories and secrets with Reminx. A secure and intimate space where you can store cherished moments, dark secrets, and heartfelt letters to yourself. Explore the enigma within as you curate a collection of your most personal narratives in this digital sanctuary.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
