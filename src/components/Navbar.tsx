import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      background: 'rgba(18, 18, 19, 0.8)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 2rem',
        height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: 1, color: 'var(--fg)' }}>
          KRYSTOF ELECTRIC
        </a>

        <div style={{ display: 'flex', gap: '2.5rem' }} className="nav-links">
          <button onClick={() => scrollToSection('projekty')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'inherit' }}>Projekty</button>
          <button onClick={() => scrollToSection('kontakt')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'inherit' }}>Kontakt</button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
        }} className="hamburger">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div style={{
          background: 'var(--bg)', padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
        }}>
          <button onClick={() => scrollToSection('projekty')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, textAlign: 'left', fontSize: '1rem', fontFamily: 'inherit', color: 'inherit' }}>Projekty</button>
          <button onClick={() => scrollToSection('kontakt')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, textAlign: 'left', fontSize: '1rem', fontFamily: 'inherit', color: 'inherit' }}>Kontakt</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block !important; }
        }
        .nav-links a:hover { color: var(--fg) !important; }
      `}</style>
    </nav>
  );
};

export default Navbar;
