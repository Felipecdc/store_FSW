import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "@/providers/auth";
import Sidebar from "./dashboard/_components/sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <div className="flex overflow-hidden">
              <Sidebar />
              {children}
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
