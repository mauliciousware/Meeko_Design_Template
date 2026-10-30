import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tyler | DJ Good Vibes, Binghamton NY",
  icons: { icon: "/sites/tyler/record.svg" },
  description: "Meet Tyler, DJ Good Vibes. Personalized music, positive energy, and celebrations in Binghamton, NY. Weddings, private parties, school dances, and community events.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
