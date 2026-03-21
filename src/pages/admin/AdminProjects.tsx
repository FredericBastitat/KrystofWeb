import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Plus, Trash2, Edit2, X, Image as ImageIcon } from 'lucide-react';
import { type Project } from '../../data/projects';

const AdminProjects = () => {
    const { content, loading, addProject, updateProject, deleteProject, uploadImage } = useSite();
    const [uploading, setUploading] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [newProject, setNewProject] = useState({
        title: '',
        location: '',
        description: '',
        images: [] as string[],
    });

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

    if (loading) return <div>Načítám...</div>;

    return (
        <div className="admin-projects-grid">
            <div className="admin-section">
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
                                    <button onClick={() => {
                                        setEditingProject(project);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }} className="action-btn edit" title="Upravit">
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

            <style>{`
        .admin-projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .admin-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--primary);
        }
        .section-header h2 { font-size: 1.1rem; color: #fff; font-weight: 600; }
        .modern-card {
          padding: 2rem;
          border: 1px solid #222;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
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
        .upload-zone { margin-bottom: 1rem; }
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
        }
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
        }
        .btn-outline {
          border: 1px solid #333;
          background: transparent;
          color: #fff;
          padding: 0.9rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
        }
        .project-table-card { border: 1px solid #222; border-radius: 12px; overflow: hidden; }
        .project-list-header {
          display: grid;
          grid-template-columns: 80px 1fr 1fr 120px;
          padding: 1rem 2rem;
          background: #161618;
          color: #666;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
        .list-row {
          display: grid;
          grid-template-columns: 80px 1fr 1fr 120px;
          padding: 1rem 2rem;
          align-items: center;
          border-bottom: 1px solid #222;
        }
        .row-img { width: 50px; height: 50px; border-radius: 8px; overflow: hidden; background: #222; display: flex; align-items: center; justify-content: center; }
        .row-img img { width: 100%; height: 100%; object-fit: cover; }
        .row-actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
        .action-btn { width: 36px; height: 36px; border-radius: 8px; border: 1px solid #333; background: transparent; color: #888; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .action-btn:hover { color: #fff; }
        .action-btn.edit:hover { color: var(--primary); border-color: var(--primary); }
        .action-btn.delete:hover { color: #ef4444; border-color: #ef4444; }
        .loader { width: 24px; height: 24px; border: 3px solid #333; border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; }
          .project-list-header { display: none; }
          .list-row { grid-template-columns: 60px 1fr 100px; }
        }
      `}</style>
        </div>
    );
};

export default AdminProjects;
