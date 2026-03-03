import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      background: 'rgba(248,248,246,0.92)', backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 2rem',
        height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: 1 }}>
          KRYSTOF ELECTRIC
        </a>

        <div style={{ display: 'flex', gap: '2.5rem' }} className="nav-links">
          <a href="#projekty" style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500 }}>Projekty</a>
          <a href="#kontakt" style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500 }}>Kontakt</a>
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
          <a href="#projekty" onClick={() => setIsOpen(false)} style={{ fontWeight: 500 }}>Projekty</a>
          <a href="#kontakt" onClick={() => setIsOpen(false)} style={{ fontWeight: 500 }}>Kontakt</a>
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
