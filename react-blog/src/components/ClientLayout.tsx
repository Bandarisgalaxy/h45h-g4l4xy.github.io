"use client";
import { ReactNode, useState, useCallback, useEffect, useRef } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FirstVisitLoader from "@/components/FirstVisitLoader";
import PageTransition from "@/components/PageTransition";

interface ClientLayoutProps {
  children: ReactNode;
}

function InnerLayout({ children }: ClientLayoutProps) {
  // Always start false on server AND client — no hydration mismatch.
  // The useEffect below upgrades to true for return visitors after mount.
  const [contentReady, setContentReady] = useState(false);
  const isMounted = useRef(false);
  const { markLoaderDone } = useLoader();

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    let isReturnVisit = false;
    try {
      isReturnVisit = !!sessionStorage.getItem("siteLoaded");
    } catch {
      isReturnVisit = true;
    }
    if (isReturnVisit) {
      // Remove the attribute immediately so CSS can't fight the inline style
      document.documentElement.removeAttribute("data-first-visit");
      setContentReady(true);
      markLoaderDone();
    }
  }, [markLoaderDone]);

  const handleLoaderDone = useCallback(() => {
    setContentReady(true);
    markLoaderDone();
  }, [markLoaderDone]);

  return (
    <>
      {/* Global first-visit loader — works on all routes including deep links */}
      <FirstVisitLoader onDone={handleLoaderDone} />

      <CustomCursor />

      <div
        data-page-content="true"
        style={{
          opacity: contentReady ? 1 : 0,
          transition: contentReady ? "opacity 0.55s ease" : "none",
          pointerEvents: contentReady ? "auto" : "none",
        }}
      >
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <InnerLayout>{children}</InnerLayout>
      </LoaderProvider>
    </ThemeProvider>
  );
}
