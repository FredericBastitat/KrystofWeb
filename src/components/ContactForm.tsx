import { Mail, Phone, Instagram } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const contacts = [
  {
    icon: <Phone size={22} />,
    label: 'Telefon',
    value: '+420 792 308 440',
    href: 'tel:+420792308440',
  },
  {
    icon: <Mail size={22} />,
    label: 'E-mail',
    value: 'krystofdvorak1311@gmail.com',
    href: 'mailto:krystofdvorak1311@gmail.com',
  },
  {
    icon: <Instagram size={22} />,
    label: 'Instagram',
    value: '@elektrotechnika_dvorak',
    href: 'https://www.instagram.com/elektrotechnika_dvorak/',
  },
];

const ContactForm = () => {
  const { content, loading } = useSite();

  if (loading) return null;

  return (
    <section id="kontakt" style={{ borderTop: '1px solid var(--border)' }}>
      <p style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1rem' }}>
        Kontakt
      </p>
      <h2 style={{ marginBottom: '0.5rem' }}>{content.contact.title}</h2>
      <p style={{ marginBottom: '3.5rem', maxWidth: 420 }}>
        {content.contact.description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderTop: '1px solid var(--border)' }}>
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.4rem 0',
              borderBottom: '1px solid var(--border)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--muted)' }}>{c.icon}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{c.label}</span>
            </div>
            <span style={{ fontWeight: 600 }}>{c.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContactForm;
