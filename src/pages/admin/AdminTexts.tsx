import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { Edit2, Save, Mail } from 'lucide-react';

const AdminTexts = () => {
    const { content, loading, updateHero, updateContact } = useSite();
    const [heroForm, setHeroForm] = useState(content.hero);
    const [contactForm, setContactForm] = useState(content.contact);

    useEffect(() => {
        if (!loading) {
            setHeroForm(content.hero);
            setContactForm(content.contact);
        }
    }, [loading, content.hero, content.contact]);

    const handleHeroSave = async () => {
        await updateHero(heroForm);
        alert('Hero sekce uložena!');
    };

    const handleContactSave = async () => {
        await updateContact(contactForm);
        alert('Kontakt uložen!');
    };

    if (loading) return <div>Načítám...</div>;

    return (
        <div className="admin-content-grid">
            <div className="admin-section">
                <div className="section-header">
                    <Edit2 size={20} />
                    <h2>Hero Sekce</h2>
                </div>
                <div className="glass-card modern-card">
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Nadpis (Overline)</label>
                            <input
                                type="text"
                                value={heroForm.overline}
                                onChange={e => setHeroForm({ ...heroForm, overline: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Hlavní titulek</label>
                            <input
                                type="text"
                                value={heroForm.title}
                                onChange={e => setHeroForm({ ...heroForm, title: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Popis</label>
                        <textarea
                            rows={3}
                            value={heroForm.description}
                            onChange={e => setHeroForm({ ...heroForm, description: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleHeroSave}>
                        <Save size={16} /> Uložit texty
                    </button>
                </div>
            </div>

            <div className="admin-section">
                <div className="section-header">
                    <Mail size={20} />
                    <h2>Sekce Kontakt (Spodní text)</h2>
                </div>
                <div className="glass-card modern-card">
                    <div className="form-group">
                        <label>Titulek kontaktu</label>
                        <input
                            type="text"
                            value={contactForm.title}
                            onChange={e => setContactForm({ ...contactForm, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Popis kontaktu</label>
                        <textarea
                            rows={2}
                            value={contactForm.description}
                            onChange={e => setContactForm({ ...contactForm, description: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleContactSave}>
                        <Save size={16} /> Uložit kontakt
                    </button>
                </div>
            </div>

            <style>{`
        .admin-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .admin-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--primary);
        }
        .section-header h2 { font-size: 1.1rem; color: #fff; font-weight: 600; }
        .modern-card {
          padding: 2rem;
          border: 1px solid #222;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        input, textarea {
          width: 100%;
          background: #161618;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 0.9rem 1.2rem;
          color: #fff;
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus {
          border-color: var(--primary);
          outline: none;
        }
        .btn-primary {
          background: var(--primary);
          color: #000;
          font-weight: 600;
          padding: 0.9rem 1.5rem;
          border-radius: 10px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default AdminTexts;
