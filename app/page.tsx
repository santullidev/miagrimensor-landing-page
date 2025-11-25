import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import BlogPreview from "@/components/blog-preview";
import CTASection from "@/components/cta-section";
import ScrollToTop from "@/components/scroll-to-top";
import ServiceCoverage from "@/components/service-coverage";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <ServiceCoverage />
      <BlogPreview />
      <FAQ />
      
      <Footer />
      <ScrollToTop />
    </>
  );
}
