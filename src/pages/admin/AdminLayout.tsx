import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Image as ImageIcon, LogOut, Edit2, Plus } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    userEmail?: string;
}

const AdminLayout = ({ children, userEmail }: AdminLayoutProps) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <ImageIcon size={24} color="var(--primary)" />
                    <span>Admin Panel</span>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/" className="nav-item"><ArrowLeft size={18} /> Web</Link>
                    <div className="nav-divider">Správa</div>
                    <Link to="/admin/texts" className={`nav-item ${isActive('/admin/texts') ? 'active' : ''}`}>
                        <Edit2 size={18} /> Edit textů
                    </Link>
                    <Link to="/admin/projects" className={`nav-item ${isActive('/admin/projects') ? 'active' : ''}`}>
                        <Plus size={18} /> Edit projektů
                    </Link>
                    <div className="nav-divider">Ostatní</div>
                    <button onClick={handleSignOut} className="nav-item logout"><LogOut size={18} /> Odhlásit se</button>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <h1>Správa obsahu</h1>
                    <div className="user-info">{userEmail}</div>
                </header>
                {children}
            </main>

            <style>{`
        .admin-layout {
            display: grid;
            grid-template-columns: 240px 1fr;
            min-height: 100vh;
            background: #0a0a0b;
            color: #fff;
        }
        .admin-sidebar {
            background: #111113;
            border-right: 1px solid #222;
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 3rem;
            position: sticky;
            top: 0;
            height: 100vh;
        }
        .sidebar-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 700;
            font-size: 1.1rem;
        }
        .sidebar-nav {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .nav-divider {
            font-size: 0.7rem;
            color: #444;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 1.5rem 1rem 0.5rem;
            font-weight: 700;
        }
        .nav-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            color: #888;
            text-decoration: none;
            transition: all 0.2s;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.95rem;
        }
        .nav-item:hover, .nav-item.active {
            color: #fff;
            background: #1a1a1c;
        }
        .nav-item.active {
            color: var(--primary);
            border-left: 2px solid var(--primary);
            border-radius: 0 8px 8px 0;
        }
        .nav-item.logout:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
        .admin-main {
            padding: 2rem 3rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
        }
        .admin-topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
        }
        .admin-topbar h1 { font-size: 1.75rem; font-weight: 700; }
        .user-info { font-size: 0.85rem; color: #666; }

        @media (max-width: 768px) {
            .admin-layout { grid-template-columns: 1fr; }
            .admin-sidebar { display: none; }
            .admin-main { padding: 1.5rem; }
        }
      `}</style>
        </div>
    );
};

export default AdminLayout;
