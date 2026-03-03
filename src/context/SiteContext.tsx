import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Project } from '../data/projects';
import { supabase } from '../lib/supabase';

interface SiteContent {
    hero: {
        overline: string;
        title: string;
        description: string;
    };
    projects: Project[];
}

interface SiteContextType {
    content: SiteContent;
    loading: boolean;
    updateHero: (hero: Partial<SiteContent['hero']>) => Promise<void>;
    addProject: (project: Omit<Project, 'id'>) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>({
        hero: { overline: '', title: '', description: '' },
        projects: [],
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Hero
            const { data: heroData, error: heroError } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'hero_content')
                .single();

            // Fetch Projects
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: true });

            if (heroError) console.error('Error fetching hero:', heroError);
            if (projectsError) console.error('Error fetching projects:', projectsError);

            setContent({
                hero: heroData?.value || {
                    overline: 'Elektroinstalace',
                    title: 'Profesionální elektrikář\ns precizním přístupem.',
                    description: 'Nabízím elektroinstalace novostaveb, rekonstrukcí a veškeré elektrické práce pro domácnosti i firmy.'
                },
                projects: projectsData || [],
            });
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateHero = async (heroUpdates: Partial<SiteContent['hero']>) => {
        const newHero = { ...content.hero, ...heroUpdates };
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key: 'hero_content', value: newHero });

        if (error) {
            console.error('Update hero error:', error);
            alert('Chyba při ukládání!');
        } else {
            setContent(prev => ({ ...prev, hero: newHero }));
        }
    };

    const addProject = async (newProject: Omit<Project, 'id'>) => {
        const { data, error } = await supabase
            .from('projects')
            .insert([newProject])
            .select()
            .single();

        if (error) {
            console.error('Add project error:', error);
            alert('Chyba při přidávání projektu!');
        } else if (data) {
            setContent(prev => ({ ...prev, projects: [...prev.projects, data] }));
        }
    };

    const deleteProject = async (id: number) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete project error:', error);
            alert('Chyba při mazání projektu!');
        } else {
            setContent(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
        }
    };

    return (
        <SiteContext.Provider value={{ content, loading, updateHero, addProject, deleteProject }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
};
