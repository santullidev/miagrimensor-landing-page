import FAQ from "@/components/faq";
import Features from "@/components/features";
import OtrosServicios from "@/components/features-07/features-07";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import BlogPreview from "@/components/blog-preview";
import CTASection from "@/components/cta-section";
import ScrollToTop from "@/components/scroll-to-top";
import Testimonial06 from "@/components/testimonial-06/testimonial-06";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <FAQ />
      <Testimonial06 />
      <OtrosServicios/>
      <BlogPreview />
      <Footer />
      <ScrollToTop />
    </>
  );
}
