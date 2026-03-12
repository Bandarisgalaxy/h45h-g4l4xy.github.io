import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "H45H G4L4XY | Cybersecurity Blog",
  description:
    "Cybersecurity Researcher | SOC Analyst | CTF Player — PicoCTF writeups, SOC learning, and security projects by HARSHITH.",
  keywords: [
    "cybersecurity",
    "CTF",
    "SOC",
    "PicoCTF",
    "security research",
    "H45H G4L4XY",
  ],
  authors: [{ name: "HARSHITH", url: "https://bandarisgalaxy.github.io" }],
  openGraph: {
    title: "H45H G4L4XY | Cybersecurity Blog",
    description: "Cybersecurity Researcher | SOC Analyst | CTF Player",
    type: "website",
    url: "https://bandarisgalaxy.github.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        {/* Always dark mode — no theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');`,
          }}
        />
        {/* Hide page content on first visit until the loader completes.
            This runs synchronously before React hydrates so there is zero
            content flash even on direct / deep-link navigation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem('siteLoaded')){document.documentElement.setAttribute('data-first-visit','');}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] font-mono antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
