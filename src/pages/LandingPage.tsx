import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col selection:bg-primary selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}