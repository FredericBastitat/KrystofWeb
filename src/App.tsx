import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Admin from './pages/Admin';
import Login from './pages/Login';

import { Link } from 'react-router-dom';

const HomePage = () => (
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
