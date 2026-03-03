import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Plus, Trash2, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
    const { content, loading, updateHero, addProject, deleteProject } = useSite();
    const [heroForm, setHeroForm] = useState(content.hero);

    // Sync heroForm when content changes (after initial load)
    useEffect(() => {
        if (!loading) {
            setHeroForm(content.hero);
        }
    }, [loading, content.hero]);

    const [newProject, setNewProject] = useState({
        title: '',
        location: '',
        description: '',
        images: [] as string[],
    });
    const [newImageUrl, setNewImageUrl] = useState('');

    if (loading) return <div className="admin-container">Načítám...</div>;

    const handleHeroSave = () => {
        updateHero(heroForm);
        alert('Hero sekce uložena!');
    };

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title) return;
        addProject(newProject);
        setNewProject({ title: '', location: '', description: '', images: [] });
        alert('Projekt přidán!');
    };

    const addImageToNewProject = () => {
        if (newImageUrl) {
            setNewProject(prev => ({ ...prev, images: [...prev.images, newImageUrl] }));
            setNewImageUrl('');
        }
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <Link to="/" className="back-link"><ArrowLeft size={18} /> Zpět na web</Link>
                <h1>Administrativní mód</h1>
            </header>

            <div className="admin-grid">
                {/* Hero Section Edit */}
                <section className="admin-card glass-card">
                    <h2>Upravit texty (Hero)</h2>
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
                        <textarea
                            rows={2}
                            value={heroForm.title}
                            onChange={e => setHeroForm({ ...heroForm, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Popis</label>
                        <textarea
                            rows={3}
                            value={heroForm.description}
                            onChange={e => setHeroForm({ ...heroForm, description: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-dark" onClick={handleHeroSave}>
                        <Save size={16} /> Uložit texty
                    </button>
                </section>

                {/* Add Project */}
                <section className="admin-card glass-card">
                    <h2>Přidat nový projekt</h2>
                    <form onSubmit={handleAddProject}>
                        <div className="form-group">
                            <label>Název projektu</label>
                            <input
                                type="text"
                                required
                                value={newProject.title}
                                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Lokalita a rok</label>
                            <input
                                type="text"
                                value={newProject.location}
                                onChange={e => setNewProject({ ...newProject, location: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Popis práce</label>
                            <textarea
                                rows={3}
                                value={newProject.description}
                                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Obrázky (URL)</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={newImageUrl}
                                    onChange={e => setNewImageUrl(e.target.value)}
                                />
                                <button type="button" className="btn btn-outline" onClick={addImageToNewProject} style={{ padding: '0 1rem' }}>
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="admin-images-preview">
                                {newProject.images.map((img, i) => (
                                    <div key={i} className="preview-img">
                                        <img src={img} alt="preview" />
                                        <button type="button" onClick={() => setNewProject(p => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}>
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '1rem' }}>
                            <Plus size={16} /> Přidat projekt
                        </button>
                    </form>
                </section>

                {/* Manage Projects */}
                <section className="admin-card glass-card full-width">
                    <h2>Správa projektů</h2>
                    <div className="project-list">
                        {content.projects.map(project => (
                            <div key={project.id} className="admin-project-item">
                                <div className="item-info">
                                    <div className="item-img">
                                        {project.images[0] ? <img src={project.images[0]} /> : <ImageIcon size={20} />}
                                    </div>
                                    <div>
                                        <strong>{project.title}</strong>
                                        <p>{project.location}</p>
                                    </div>
                                </div>
                                <button className="delete-btn" onClick={() => deleteProject(project.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style>{`
        .admin-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        .admin-header {
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--primary); }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .full-width { grid-column: 1 / -1; }
        .admin-card {
          padding: 2rem;
        }
        .admin-card h2 { margin-bottom: 1.5rem; font-size: 1.25rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: var(--muted);
        }
        input, textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          color: white;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus { border-color: var(--primary); }
        .admin-images-preview {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .preview-img {
          position: relative;
          width: 60px; height: 60px;
          border-radius: 4px; overflow: hidden;
        }
        .preview-img img { width: 100%; height: 100%; object-fit: cover; }
        .preview-img button {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          color: white; border: none; cursor: pointer;
          opacity: 0; transition: opacity 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .preview-img:hover button { opacity: 1; }
        .project-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .admin-project-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .item-info { display: flex; align-items: center; gap: 1rem; }
        .item-img {
          width: 48px; height: 48px;
          background: #222; border-radius: 8px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        .item-img img { width: 100%; height: 100%; object-fit: cover; }
        .item-info p { font-size: 0.8rem; color: var(--muted); margin: 0; }
        .delete-btn {
          background: none; border: none; color: #ef4444;
          cursor: pointer; opacity: 0.7; transition: opacity 0.2s;
        }
        .delete-btn:hover { opacity: 1; }
        @media (max-width: 768px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default Admin;
