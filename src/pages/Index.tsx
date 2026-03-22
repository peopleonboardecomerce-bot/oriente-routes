import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MisionVision from "@/components/MisionVision";
import ComoFunciona from "@/components/ComoFunciona";
import BlogHighlights from "@/components/BlogHighlights";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
  const { hash } = useLocation();

  // When navigated from another page via /#anchor, scroll to the target
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    // Wait a tick for the DOM to render
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MisionVision />
        <ComoFunciona />
        <BlogHighlights />
      </main>
      <SiteFooter />
    </div>
  );
}

