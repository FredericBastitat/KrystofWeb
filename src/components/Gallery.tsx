import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Image } from 'lucide-react';
import { projects, type Project } from '../data/projects';

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const prev = () => setCurrentImg((i) => (i - 1 + project.images.length) % project.images.length);
  const next = () => setCurrentImg((i) => (i + 1) % project.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X /></button>

        {/* Image viewer */}
        <div className="modal-image-area">
          <img src={project.images[currentImg]} alt={`${project.title} foto ${currentImg + 1}`} />
          {project.images.length > 1 && (
            <>
              <button className="nav-btn nav-prev" onClick={prev}><ChevronLeft /></button>
              <button className="nav-btn nav-next" onClick={next}><ChevronRight /></button>
              <div className="image-counter">{currentImg + 1} / {project.images.length}</div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {project.images.length > 1 && (
          <div className="thumbnails">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Náhled ${i + 1}`}
                className={i === currentImg ? 'thumb active' : 'thumb'}
                onClick={() => setCurrentImg(i)}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="modal-info">
          <div className="modal-header">
            <h3>{project.title}</h3>
            <span className="location"><MapPin size={14} /> {project.location}</span>
          </div>
          <p>{project.description}</p>
        </div>
      </motion.div>

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .modal-content {
          background: #111;
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          width: 100%; max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          background: rgba(0,0,0,0.6); border: none;
          color: white; cursor: pointer; border-radius: 50%;
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
        }
        .modal-image-area {
          position: relative; width: 100%;
          aspect-ratio: 16/10; background: #000;
          border-radius: 20px 20px 0 0; overflow: hidden;
        }
        .modal-image-area img {
          width: 100%; height: 100%; object-fit: contain;
        }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.6); border: none; color: white;
          cursor: pointer; border-radius: 50%;
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .nav-btn:hover { background: var(--primary); }
        .nav-prev { left: 12px; }
        .nav-next { right: 12px; }
        .image-counter {
          position: absolute; bottom: 10px; right: 14px;
          background: rgba(0,0,0,0.6); color: white;
          padding: 2px 10px; border-radius: 20px; font-size: 0.8rem;
        }
        .thumbnails {
          display: flex; gap: 8px; padding: 12px 16px;
          overflow-x: auto; background: #0a0a0a;
        }
        .thumb {
          width: 64px; height: 64px; object-fit: cover;
          border-radius: 8px; cursor: pointer; opacity: 0.5;
          border: 2px solid transparent; transition: all 0.2s; flex-shrink: 0;
        }
        .thumb.active { opacity: 1; border-color: var(--primary); }
        .modal-info {
          padding: 20px 24px 28px;
        }
        .modal-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 12px;
        }
        .modal-header h3 { font-size: 1.4rem; }
        .location {
          display: flex; align-items: center; gap: 4px;
          color: var(--primary); font-size: 0.85rem; white-space: nowrap;
        }
        .modal-info p { color: #a1a1aa; line-height: 1.7; }
      `}</style>
    </motion.div>
  );
};

const Gallery = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projekty" className="gallery">
      <h2>Naše Projekty</h2>
      <p style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '-1rem' }}>
        Klikněte na projekt pro zobrazení detailů a fotografií
      </p>

      <div className="grid">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -8 }}
            className="project-card glass-card"
            onClick={() => setSelected(project)}
          >
            <div className="img-container">
              <img src={project.images[0]} alt={project.title} loading="lazy" />
              <div className="card-overlay">
                <span className="photo-count"><Image size={14} /> {project.images.length} foto</span>
                <div className="card-info">
                  <span className="card-location"><MapPin size={12} /> {project.location}</span>
                  <h3>{project.title}</h3>
                  <p className="card-desc">{project.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <style>{`
        .gallery { padding-top: 50px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .project-card { overflow: hidden; cursor: pointer; }
        .img-container {
          position: relative; aspect-ratio: 4/3; overflow: hidden;
        }
        .img-container img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .project-card:hover img { transform: scale(1.08); }
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.1) 100%);
          padding: 1.2rem;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .photo-count {
          display: flex; align-items: center; gap: 5px; align-self: flex-end;
          background: rgba(0,0,0,0.6); color: white;
          padding: 4px 10px; border-radius: 20px; font-size: 0.8rem;
        }
        .card-info { color: white; }
        .card-location {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.8rem; color: var(--primary); margin-bottom: 4px;
        }
        .card-info h3 { font-size: 1.15rem; margin-bottom: 6px; }
        .card-desc {
          font-size: 0.85rem; color: #ccc; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
