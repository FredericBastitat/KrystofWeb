import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">KRYSTOF</a>
        
        <div className="nav-links">
          <a href="#projekty">Projekty</a>
          <a href="#kontakt">Kontakt</a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <a href="#projekty" onClick={() => setIsOpen(false)}>Projekty</a>
          <a href="#kontakt" onClick={() => setIsOpen(false)}>Kontakt</a>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--primary);
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          color: #a1a1aa;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav-links a:hover {
          color: var(--foreground);
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--foreground);
          cursor: pointer;
        }
        .mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          width: 100%;
          background: var(--background);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
