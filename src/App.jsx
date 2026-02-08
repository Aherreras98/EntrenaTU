import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/Landing/Hero';
import Features from './components/Landing/Features';
import Steps from './components/Landing/Steps';
import './index.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-700 w-full">
      <Navbar />
      <main className="flex-grow w-full">
        <Hero />
        <Features />
        <Steps />
      </main>
      <Footer />
    </div>
  );
}

export default App;