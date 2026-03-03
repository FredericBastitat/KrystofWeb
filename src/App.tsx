import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="app">
      <div className="glow-bg"></div>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <ContactForm />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Krystof Portfolio. Všechna práva vyhrazena.</p>
        </div>
      </footer>

      <style>{`
        .footer {
          padding: 4rem 2rem;
          text-align: center;
          border-top: 1px solid var(--glass-border);
          margin-top: 4rem;
        }
        .footer p { font-size: 0.9rem; }
      `}</style>
    </div>
  );
}

export default App;
