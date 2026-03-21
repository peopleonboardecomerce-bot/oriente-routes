import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MisionVision from "@/components/MisionVision";
import ComoFunciona from "@/components/ComoFunciona";
import BlogHighlights from "@/components/BlogHighlights";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
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
