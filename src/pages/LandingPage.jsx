import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Trust from '../components/landing/Trust';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar onStart={onStart} />
      <Hero onStart={onStart} />
      <HowItWorks />
      <Features />
      <Trust />
      <FAQ />
      <FinalCTA onStart={onStart} />
      <Footer />
    </div>
  );
}
