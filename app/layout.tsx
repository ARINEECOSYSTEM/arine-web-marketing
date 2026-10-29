import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "ARINE Ecosystem — Meta on Autopilot", description: "Research, launch and optimise Meta campaigns from one system.", alternates: { canonical: "https://www.arineecosystem.com/" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
