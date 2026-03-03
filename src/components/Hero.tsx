import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Hero = () => {
  const { content, loading } = useSite();
  const { hero } = content;

  if (loading) return <div style={{ height: '400px' }} />;

  return (
    <section style={{ paddingTop: 160, paddingBottom: 120, borderBottom: '1px solid var(--border)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          {hero.overline}
        </p>
        <h1 style={{ maxWidth: 700, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
          {hero.title}
        </h1>
        <p style={{ maxWidth: 480, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          {hero.description}
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
};

export default Hero;
