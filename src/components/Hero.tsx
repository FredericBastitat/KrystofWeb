import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-content"
            >
                <span className="badge">Dostupný pro zakázky</span>
                <h1>Digitální tvorba & <br /> <span className="text-glow">Inovativní design</span></h1>
                <p>Tvořím moderní vizuální identity a webové aplikace, které pomáhají značkám růst v digitálním věku.</p>
                <div className="hero-actions">
                    <a href="#projekty" className="btn-primary">Moje práce</a>
                    <a href="#kontakt" className="btn-secondary">Kontaktujte mě</a>
                </div>
            </motion.div>

            <div className="glow-orb" style={{ top: '-10%', right: '10%' }}></div>
            <div className="glow-orb" style={{ bottom: '10%', left: '-5%', background: 'var(--secondary)', opacity: 0.3 }}></div>

            <style>{`
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-content {
          max-width: 800px;
          position: relative;
          z-index: 10;
        }
        .badge {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid var(--primary);
          color: var(--primary);
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .text-glow {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .btn-secondary {
          padding: 12px 24px;
          color: white;
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: var(--glass);
        }
      `}</style>
        </section>
    );
};

export default Hero;
