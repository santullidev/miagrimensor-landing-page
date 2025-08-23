import FAQ from "@/components/faq";
import Features from "@/components/features";
import Features07Page from "@/components/features-07/features-07";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import Testimonial from "@/components/testimonial";
import BlogPreview from "@/components/blog-preview";
import CTASection from "@/components/cta-section";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <FAQ />
      <Testimonial />
      <Features07Page/>
      <BlogPreview />
      <Footer />
      <ScrollToTop />
    </>
  );
}
