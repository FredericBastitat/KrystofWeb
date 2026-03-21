import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError('Nesprávný e-mail nebo heslo.');
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="login-container">
            <Link to="/" className="back-link login-back"><ArrowLeft size={18} /> Zpět na web</Link>

            <div className="login-card glass-card">
                <div className="login-header">
                    <LogIn size={32} color="var(--primary)" />
                    <h1>Přihlášení správce</h1>
                    <p>Zadejte údaje pro přístup k administraci</p>
                </div>

                <form onSubmit={handleLogin}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="vás@email.cz"
                        />
                    </div>

                    <div className="form-group">
                        <label>Heslo</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Přihlašování...' : 'Přihlásit se'}
                    </button>
                </form>
            </div>

            <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--bg);
        }
        .login-back {
          position: absolute;
          top: 2rem;
          left: 2rem;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 3rem 2rem;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-header h1 {
          font-size: 1.5rem;
          margin: 1rem 0 0.5rem;
        }
        .login-header p {
          color: var(--muted);
          font-size: 0.9rem;
        }
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: var(--muted);
        }
        input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          color: white;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus { border-color: var(--primary); }
      `}</style>
        </div>
    );
};

export default Login;
