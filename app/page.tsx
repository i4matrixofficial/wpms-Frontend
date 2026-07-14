import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Services from "@/components/Services";
// import AppShowcase from "@/components/AppShowcase";
// import WhyFixora from "@/components/WhyFixora";
// import Testimonials from "@/components/Testimonials";
// import CTA from "@/components/CTA";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
       <HowItWorks/>
      <Features />
      <Services />   {/* 
      <AppShowcase />
      <WhyFixora />
      <Testimonials />
      <CTA />
      <Footer /> */}
    </>
  );
}