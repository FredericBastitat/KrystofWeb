export interface Project {
    id: number;
    title: string;
    location: string;
    description: string;
    images: string[];
}

const BASE = import.meta.env.BASE_URL;

export const projects: Project[] = [
    {
        id: 1,
        title: "Rodinný dům – Brno",
        location: "Brno, 2024",
        description:
            "Kompletní elektroinstalace novostavby rodinného domu. Práce zahrnovaly rozvod silnoproudu, instalaci rozvaděče, uzemnění, osvětlení ve všech místnostech a přípravu pro fotovoltaiku.",
        images: [
            `${BASE}images/Project1/IMG_3565.jpeg`,
            `${BASE}images/Project1/IMG_3568.jpeg`,
        ],
    },
    // Přidejte další projekty zde:
    // {
    //   id: 2,
    //   title: "Název projektu",
    //   location: "Město, rok",
    //   description: "Popis provedených prací…",
    //   images: [
    //     `${BASE}images/Project2/foto1.jpg`,
    //     `${BASE}images/Project2/foto2.jpg`,
    //   ],
    // },
];
