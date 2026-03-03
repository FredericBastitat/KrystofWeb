import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { useSite } from './context/SiteContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { loading } = useSite();

  if (loading) return (
    <div style={{
      background: '#121213',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      Načítám web...
    </div>
  );

  return (
    <>
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
        <p style={{ fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Elektrotechnika Dvořák</Link>
        </p>
      </footer>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
