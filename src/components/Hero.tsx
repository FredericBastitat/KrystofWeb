import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => (
  <section style={{ paddingTop: 160, paddingBottom: 120, borderBottom: '1px solid var(--border)' }}>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        Elektroinstalace & Revize
      </p>
      <h1 style={{ maxWidth: 700, marginBottom: '1.5rem' }}>
        Profesionální elektrikář<br />s precizním přístupem.
      </h1>
      <p style={{ maxWidth: 480, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
        Nabízím elektroinstalace novostaveb, rekonstrukcí, revize
        a veškeré elektrické práce pro domácnosti i firmy.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a href="#projekty" className="btn btn-dark">Moje projekty</a>
        <a href="#kontakt" className="btn btn-outline">Kontakt</a>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      style={{ marginTop: '5rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem' }}
    >
      <ArrowDown size={14} />
      <span>Přejděte níže pro projekty</span>
    </motion.div>
  </section>
);

export default Hero;
