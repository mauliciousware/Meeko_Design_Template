import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meeko — Creative Portfolio",
  icons: { icon: "/sites/meeko/favicon.png", apple: "/sites/meeko/apple-touch-icon.png" },
  description: "I'm Meeko, a product designer. Explore my selected work, creative process, and capabilities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
