import React, { useState, useEffect, useCallback } from 'react';
import type { AdminUser, RegisteredUser, UserStatus } from '../types';
import * as api from '../api';
import Card from './common/Card';
import Button from './common/Button';
import { useToast } from '../hooks/useToast';
import SkeletonLoader from './common/SkeletonLoader';

type AdminTab = 'dashboard' | 'recruitment' | 'content' | 'users';

const AdminPanel: React.FC<{ adminUser: AdminUser; onLogout: () => void }> = ({ adminUser, onLogout }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
    const { addToast } = useToast();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [dashboard, users] = await Promise.all([
                api.getAdminDashboardData(),
                api.getRegisteredUsers(),
            ]);
            setDashboardData(dashboard);
            setRegisteredUsers(users);
        } catch (error) {
            addToast(error instanceof Error ? error.message : 'Failed to fetch admin data', 'error');
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateStatus = async (userId: string, status: UserStatus, notes: string) => {
        try {
            await api.updateRegisteredUserStatus(userId, status, notes);
            addToast('User status updated successfully!', 'success');
            fetchData(); // Refresh data
        } catch (error) {
            addToast(error instanceof Error ? error.message : 'Failed to update status', 'error');
        }
    };

    const renderTabContent = () => {
        if (isLoading) {
            return <SkeletonLoader className="h-64 w-full" />;
        }
        switch (activeTab) {
            case 'dashboard':
                return <div>Dashboard content with charts. Data: {JSON.stringify(dashboardData)}</div>;
            case 'recruitment':
                return <RecruitmentManagement users={registeredUsers} onUpdateStatus={handleUpdateStatus} />;
            case 'content':
                return <div>Content Management (e.g., edit events, projects).</div>;
            case 'users':
                return <div>Admin User Management.</div>;
            default:
                return null;
        }
    };

    return (
        <div className="py-20 bg-muted/50 dark:bg-dark-muted/50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Welcome, {adminUser.username} ({adminUser.role})</p>
                    </div>
                    <Button onClick={onLogout} variant="secondary">Logout</Button>
                </div>

                <div className="flex border-b border-border dark:border-dark-border mb-8">
                    {(['dashboard', 'recruitment', 'content', 'users'] as AdminTab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <Card>
                    {renderTabContent()}
                </Card>
            </div>
        </div>
    );
};

const RecruitmentManagement: React.FC<{ users: RegisteredUser[], onUpdateStatus: (userId: string, status: UserStatus, notes: string) => void }> = ({ users, onUpdateStatus }) => {
    // A simplified view for recruitment management
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Recruitment Applications</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border dark:border-dark-border">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Department</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-border/50 dark:border-dark-border/50">
                                <td className="p-2">{user.fullName}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.department}</td>
                                <td className="p-2">{user.status}</td>
                                <td className="p-2">
                                    <Button size="sm" variant="secondary" onClick={() => onUpdateStatus(user.id, 'Shortlisted', 'Reviewed by admin.')}>Shortlist</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
