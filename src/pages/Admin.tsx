import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Save, ArrowLeft, Image as ImageIcon, LogOut, Edit2, X, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { type Project } from '../data/projects';

const Admin = () => {
    const { content, loading, updateHero, updateContact, addProject, updateProject, deleteProject, uploadImage } = useSite();
    const { user, loading: authLoading, signOut } = useAuth();
    const navigate = useNavigate();

    const [heroForm, setHeroForm] = useState(content.hero);
    const [contactForm, setContactForm] = useState(content.contact);
    const [uploading, setUploading] = useState(false);

    // Edit Mode State
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [newProject, setNewProject] = useState({
        title: '',
        location: '',
        description: '',
        images: [] as string[],
    });

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!loading) {
            setHeroForm(content.hero);
            setContactForm(content.contact);
        }
    }, [loading, content.hero, content.contact]);

    if (loading || authLoading) return <div className="admin-loading">Načítám...</div>;

    const handleHeroSave = async () => {
        await updateHero(heroForm);
        alert('Texty uloženy!');
    };

    const handleContactSave = async () => {
        await updateContact(contactForm);
        alert('Kontakt uložen!');
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title) return;
        await addProject(newProject);
        setNewProject({ title: '', location: '', description: '', images: [] });
        alert('Projekt přidán!');
    };

    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;
        await updateProject(editingProject.id, editingProject);
        setEditingProject(null);
        alert('Projekt aktualizován!');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const url = await uploadImage(file);
        if (url) {
            if (isEdit && editingProject) {
                setEditingProject({ ...editingProject, images: [...editingProject.images, url] });
            } else {
                setNewProject(prev => ({ ...prev, images: [...prev.images, url] }));
            }
        }
        setUploading(false);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

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
                    <button onClick={() => document.getElementById('edit-textu')?.scrollIntoView({ behavior: 'smooth' })} className="nav-item">
                        <Edit2 size={18} /> Edit textů
                    </button>
                    <button onClick={() => document.getElementById('edit-projektu')?.scrollIntoView({ behavior: 'smooth' })} className="nav-item">
                        <Plus size={18} /> Edit projektů
                    </button>
                    <div className="nav-divider">Ostatní</div>
                    <button onClick={handleSignOut} className="nav-item logout"><LogOut size={18} /> Odhlásit se</button>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <h1>Správa obsahu</h1>
                    <div className="user-info">{user?.email}</div>
                </header>

                <div className="admin-content-grid">
                    {/* Hero Section */}
                    <div className="admin-section" id="edit-textu">
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

                        <div className="section-header" style={{ marginTop: '1rem' }}>
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

                    {/* Project Management */}
                    <div className="admin-section" id="edit-projektu">
                        <div className="section-header">
                            <Plus size={20} />
                            <h2>{editingProject ? 'Upravit projekt' : 'Nový projekt'}</h2>
                        </div>
                        <div className="glass-card modern-card">
                            <form onSubmit={editingProject ? handleUpdateProject : handleAddProject}>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label>Název projektu</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingProject ? editingProject.title : newProject.title}
                                            onChange={e => editingProject
                                                ? setEditingProject({ ...editingProject, title: e.target.value })
                                                : setNewProject({ ...newProject, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Lokalita a rok</label>
                                        <input
                                            type="text"
                                            value={editingProject ? editingProject.location : newProject.location}
                                            onChange={e => editingProject
                                                ? setEditingProject({ ...editingProject, location: e.target.value })
                                                : setNewProject({ ...newProject, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Popis práce</label>
                                    <textarea
                                        rows={3}
                                        value={editingProject ? editingProject.description : newProject.description}
                                        onChange={e => editingProject
                                            ? setEditingProject({ ...editingProject, description: e.target.value })
                                            : setNewProject({ ...newProject, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Obrázky</label>
                                    <div className="upload-zone">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, !!editingProject)}
                                            style={{ display: 'none' }}
                                            id="project-img-upload"
                                            disabled={uploading}
                                        />
                                        <label htmlFor="project-img-upload" className="upload-trigger">
                                            {uploading ? <div className="loader"></div> : <Plus size={24} />}
                                            <span>{uploading ? 'Nahrávám...' : 'Přidat fotku z disku'}</span>
                                        </label>
                                    </div>

                                    <div className="image-previews-grid">
                                        {(editingProject ? editingProject.images : newProject.images).map((img, i) => (
                                            <div key={i} className="image-preview-item">
                                                <img src={img} alt="" />
                                                <button type="button" onClick={() => {
                                                    const filtered = (editingProject ? editingProject.images : newProject.images).filter((_, idx) => idx !== i);
                                                    editingProject
                                                        ? setEditingProject({ ...editingProject, images: filtered })
                                                        : setNewProject({ ...newProject, images: filtered });
                                                }}>
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        {editingProject ? 'Aktualizovat projekt' : 'Vytvořit projekt'}
                                    </button>
                                    {editingProject && (
                                        <button type="button" className="btn btn-outline" onClick={() => setEditingProject(null)}>
                                            Zrušit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Project List */}
                    <div className="admin-section full-width">
                        <div className="section-header">
                            <ImageIcon size={20} />
                            <h2>Seznam projektů</h2>
                        </div>
                        <div className="project-table-card glass-card">
                            <div className="project-list-header">
                                <span>Náhled</span>
                                <span>Název</span>
                                <span>Lokalita</span>
                                <span style={{ textAlign: 'right' }}>Akce</span>
                            </div>
                            <div className="project-list-body">
                                {content.projects.map(project => (
                                    <div key={project.id} className={`list-row ${editingProject?.id === project.id ? 'active' : ''}`}>
                                        <div className="row-img">
                                            {project.images[0] ? <img src={project.images[0]} alt="" /> : <ImageIcon size={20} />}
                                        </div>
                                        <div className="row-title"><strong>{project.title}</strong></div>
                                        <div className="row-location">{project.location}</div>
                                        <div className="row-actions">
                                            <button onClick={() => setEditingProject(project)} className="action-btn edit" title="Upravit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteProject(project.id)} className="action-btn delete" title="Smazat">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {content.projects.length === 0 && <div className="empty-state">Žádné projekty nebyly nalezeny.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                .admin-layout {
                    display: grid;
                    grid-template-columns: 240px 1fr;
                    min-height: 100vh;
                    background: #0a0a0b;
                    color: #fff;
                }

                /* Sidebar */
                .admin-sidebar {
                    background: #111113;
                    border-right: 1px solid #222;
                    padding: 2rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
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
                .nav-item:hover {
                    color: #fff;
                    background: #1a1a1c;
                }
                .nav-item.logout:hover {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                /* Main Content */
                .admin-main {
                    padding: 2rem 3rem;
                    overflow-y: auto;
                    max-height: 100vh;
                }
                .admin-topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3rem;
                }
                .admin-topbar h1 { font-size: 1.75rem; font-weight: 700; }
                .user-info { font-size: 0.85rem; color: #666; }

                .admin-content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.5rem;
                }
                .admin-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }
                .admin-section.full-width { grid-column: 1 / -1; }
                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: var(--primary);
                }
                .section-header h2 { font-size: 1.1rem; color: #fff; font-weight: 600; }

                /* Cards */
                .modern-card {
                    padding: 2rem;
                    border: 1px solid #222;
                    background: rgba(255, 255, 255, 0.02);
                }
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                /* Forms */
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

                /* Upload Zone */
                .upload-zone {
                    margin-bottom: 1rem;
                }
                .upload-trigger {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 2rem;
                    background: #161618;
                    border: 2px dashed #333;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: #666;
                }
                .upload-trigger:hover {
                    border-color: var(--primary);
                    color: #fff;
                    background: #1a1a1c;
                }

                /* Image Previews */
                .image-previews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .image-preview-item {
                    position: relative;
                    aspect-ratio: 1;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid #333;
                }
                .image-preview-item img { width: 100%; height: 100%; object-fit: cover; }
                .image-preview-item button {
                    position: absolute;
                    top: 4px; right: 4px;
                    background: rgba(0,0,0,0.7);
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    width: 24px; height: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                .image-preview-item button:hover { background: #ef4444; }

                /* Buttons */
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
                .btn-outline {
                    border: 1px solid #333;
                    background: transparent;
                    color: #fff;
                    padding: 0.9rem 1.5rem;
                    border-radius: 10px;
                    cursor: pointer;
                }
                .btn-outline:hover { background: #1a1a1c; }

                /* Project Table */
                .project-table-card {
                    border: 1px solid #222;
                    overflow: hidden;
                }
                .project-list-header {
                    display: grid;
                    grid-template-columns: 80px 1fr 1fr 120px;
                    padding: 1rem 2rem;
                    background: #161618;
                    border-bottom: 1px solid #222;
                    color: #666;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .list-row {
                    display: grid;
                    grid-template-columns: 80px 1fr 1fr 120px;
                    padding: 1rem 2rem;
                    align-items: center;
                    border-bottom: 1px solid #222;
                    transition: background 0.2s;
                }
                .list-row:last-child { border-bottom: none; }
                .list-row:hover { background: rgba(255, 255, 255, 0.02); }
                .list-row.active { background: rgba(var(--primary-rgb), 0.05); border-left: 3px solid var(--primary); }
                .row-img {
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #222;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .row-img img { width: 100%; height: 100%; object-fit: cover; }
                .row-location { color: #666; font-size: 0.9rem; }
                .row-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                }
                .action-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: 1px solid #333;
                    background: transparent;
                    color: #888;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .action-btn:hover { color: #fff; border-color: #444; }
                .action-btn.edit:hover { color: var(--primary); border-color: var(--primary); }
                .action-btn.delete:hover { color: #ef4444; border-color: #ef4444; }

                .empty-state { padding: 4rem; text-align: center; color: #666; }

                /* Loader */
                .loader {
                    width: 24px;
                    height: 24px;
                    border: 3px solid #333;
                    border-top: 3px solid var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                @media (max-width: 1200px) {
                    .admin-content-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 768px) {
                    .admin-layout { grid-template-columns: 1fr; }
                    .admin-sidebar { display: none; }
                    .admin-main { padding: 1.5rem; }
                    .grid-2 { grid-template-columns: 1fr; }
                    .project-list-header { display: none; }
                    .list-row { grid-template-columns: 60px 1fr 100px; gap: 1rem; }
                    .row-location { display: none; }
                }
            `}</style>
        </div>
    );
};

export default Admin;
