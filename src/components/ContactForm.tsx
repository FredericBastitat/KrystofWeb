import React from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Děkuji za zprávu! Brzy se vám ozvu.");
    };

    return (
        <section id="kontakt" className="contact">
            <div className="glass-card contact-container">
                <div className="contact-info">
                    <h2>Řekněte mi o svém <br /> <span className="text-glow">projektu</span></h2>
                    <p>Máte nápad, který chcete zrealizovat? Nebo se jen chcete na něco zeptat? Napište mi a společně něco vytvoříme.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <input type="text" placeholder="Vaše jméno" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Váš email" required />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Popište váš projekt..." rows={5} required></textarea>
                    </div>
                    <button type="submit" className="btn-primary">
                        Odeslat zprávu <Send size={18} style={{ marginLeft: '10px' }} />
                    </button>
                </form>
            </div>

            <style>{`
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          padding: 4rem;
          align-items: center;
        }
        .contact-info h2 { text-align: left; }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--primary);
        }
        @media (max-width: 992px) {
          .contact-container {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 2rem;
          }
        }
      `}</style>
        </section>
    );
};

export default ContactForm;
