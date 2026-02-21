import { ReactNode } from "react";
import "./globals.css"; // your global styles

export const metadata = {
  title: "Free Online Tools - 50+ Professional Web Tools",
  description:
    "Discover free professional web tools including calculators, converters, generators, and utilities. Fast, private and no signup required.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='font-sans antialiased bg-gray-50'>{children}</body>
    </html>
  );
}
