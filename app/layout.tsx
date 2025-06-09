import type { Metadata } from "next";
import "../styles/globals.css";
import CustomSessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "게시판",
  description: "Next.js + MongoDB 게시판",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomSessionProvider>
          {children}
        </CustomSessionProvider>
      </body>
    </html>
  );
}
