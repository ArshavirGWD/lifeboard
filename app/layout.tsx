import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeBoard",
  description: "Control Your Life Stats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
