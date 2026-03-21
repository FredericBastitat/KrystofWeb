import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Project } from '../data/projects';
import { supabase } from '../lib/supabase';

interface SiteContent {
    hero: {
        overline: string;
        title: string;
        description: string;
    };
    contact: {
        title: string;
        description: string;
    };
    projects: Project[];
}

interface SiteContextType {
    content: SiteContent;
    loading: boolean;
    updateHero: (hero: Partial<SiteContent['hero']>) => Promise<void>;
    updateContact: (contact: Partial<SiteContent['contact']>) => Promise<void>;
    addProject: (project: Omit<Project, 'id'>) => Promise<void>;
    updateProject: (id: number, project: Partial<Project>) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
    uploadImage: (file: File) => Promise<string | null>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>({
        hero: { overline: '', title: '', description: '' },
        contact: { title: '', description: '' },
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
                .maybeSingle();

            // Fetch Contact
            const { data: contactData, error: contactError } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'contact_content')
                .maybeSingle();

            // Fetch Projects
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: true });

            if (heroError) console.error('Error fetching hero:', heroError);
            if (contactError) console.error('Error fetching contact:', contactError);
            if (projectsError) console.error('Error fetching projects:', projectsError);

            setContent({
                hero: heroData?.value || {
                    overline: 'Elektroinstalace',
                    title: 'Profesionální elektrikář\ns precizním přístupem.',
                    description: 'Nabízím elektroinstalace novostaveb, rekonstrukcí a veškeré elektrické práce pro domácnosti i firmy.'
                },
                contact: contactData?.value || {
                    title: 'Pojďme spolupracovat.',
                    description: 'Máte zájem o elektroinstalaci nebo revizi? Neváhejte mě kontaktovat.'
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

    const updateContact = async (contactUpdates: Partial<SiteContent['contact']>) => {
        const newContact = { ...content.contact, ...contactUpdates };
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key: 'contact_content', value: newContact });

        if (error) {
            console.error('Update contact error:', error);
            alert('Chyba při ukládání kontaktu!');
        } else {
            setContent(prev => ({ ...prev, contact: newContact }));
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

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `project-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('projects')
            .upload(filePath, file);

        if (uploadError) {
            console.error('File upload error:', uploadError);
            alert('Chyba při nahrávání obrázku!');
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('projects')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const updateProject = async (id: number, projectUpdates: Partial<Project>) => {
        const { data, error } = await supabase
            .from('projects')
            .update(projectUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Update project error:', error);
            alert('Chyba při aktualizaci projektu!');
        } else if (data) {
            setContent(prev => ({
                ...prev,
                projects: prev.projects.map(p => p.id === id ? data : p)
            }));
        }
    };

    const deleteProject = async (id: number) => {
        const projectToDelete = content.projects.find(p => p.id === id);

        // delete from db
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete project error:', error);
            alert('Chyba při mazání projektu!');
        } else {
            // Delete related images from storage if they were uploaded to our bucket
            if (projectToDelete?.images) {
                const filesToDelete = projectToDelete.images
                    .filter(url => url.includes('project-images/'))
                    .map(url => {
                        const parts = url.split('project-images/');
                        return `project-images/${parts[parts.length - 1]}`;
                    });

                if (filesToDelete.length > 0) {
                    await supabase.storage
                        .from('projects')
                        .remove(filesToDelete);
                }
            }

            setContent(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
        }
    };

    return (
        <SiteContext.Provider value={{ content, loading, updateHero, updateContact, addProject, updateProject, deleteProject, uploadImage }}>
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
