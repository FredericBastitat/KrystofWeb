import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Brand Identity 2024",
    category: "Design",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Eco Mobile App",
    category: "Development",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Minimal Interior",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Future Tech UI",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  }
];

const Gallery = () => {
  return (
    <section id="projekty" className="gallery">
      <h2>Moje Projekty</h2>
      <div className="grid">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -10 }}
            className="project-card glass-card"
          >
            <div className="img-container">
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="overlay">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .gallery { padding-top: 50px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .project-card {
          overflow: hidden;
          cursor: pointer;
        }
        .img-container {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .project-card:hover img {
          transform: scale(1.1);
        }
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .project-card:hover .overlay {
          transform: translateY(0);
          opacity: 1;
        }
        .overlay span {
          display: block;
          font-size: 0.8rem;
          color: var(--primary);
          text-transform: uppercase;
          margin-bottom: 5px;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
