import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <ContactForm />
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '2rem',
      }}>
        <p style={{ fontSize: '0.8rem' }}>© {new Date().getFullYear()} Krystof Electric</p>
      </footer>
    </div>
  );
}

export default App;
