import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feedback Tent",
  description:
    "Collect feedback from your users easily and rapidly without much hassle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
