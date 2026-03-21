import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './admin/AdminLayout';
import AdminTexts from './admin/AdminTexts';
import AdminProjects from './admin/AdminProjects';

const Admin = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    if (authLoading) return <div className="admin-loading">Autorizuji...</div>;
    if (!user) return null;

    return (
        <AdminLayout userEmail={user.email}>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/projects" replace />} />
                <Route path="/texts" element={<AdminTexts />} />
                <Route path="/projects" element={<AdminProjects />} />
            </Routes>
        </AdminLayout>
    );
};

export default Admin;
