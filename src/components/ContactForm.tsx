import { Mail, Phone, Instagram } from 'lucide-react';

const contacts = [
  {
    icon: <Phone size={22} />,
    label: 'Telefon',
    value: '+420 XXX XXX XXX',
    href: 'tel:+420XXXXXXXXX',
  },
  {
    icon: <Mail size={22} />,
    label: 'E-mail',
    value: 'vas@email.cz',
    href: 'mailto:vas@email.cz',
  },
  {
    icon: <Instagram size={22} />,
    label: 'Instagram',
    value: '@vas_instagram',
    href: 'https://instagram.com/vas_instagram',
  },
];

const ContactForm = () => (
  <section id="kontakt" style={{ borderTop: '1px solid var(--border)' }}>
    <p style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1rem' }}>
      Kontakt
    </p>
    <h2 style={{ marginBottom: '0.5rem' }}>Pojďme spolupracovat.</h2>
    <p style={{ marginBottom: '3.5rem', maxWidth: 420 }}>
      Máte zájem o elektroinstalaci nebo revizi? Neváhejte mě kontaktovat.
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

export default ContactForm;
