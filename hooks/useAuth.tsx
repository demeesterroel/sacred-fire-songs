'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export type UserRole = 'admin' | 'musician' | 'member' | 'guest';

// Mock Users Configuration
// Mock Users Configuration (using valid UUIDs for DB compatibility)
export const MOCK_USERS = {
    'guest': null,
    'mock-member': { id: '11111111-1111-1111-1111-111111111111', email: 'member@mock.com', role: 'member' as UserRole },
    'mock-musician': { id: '22222222-2222-2222-2222-222222222222', email: 'musician@mock.com', role: 'musician' as UserRole },
    'mock-admin': { id: '33333333-3333-3333-3333-333333333333', email: 'admin@mock.com', role: 'admin' as UserRole },
};

export interface AuthUser {
    id: string;
    email?: string;
    role: UserRole;
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [mockRole, setMockRole] = useState<string | null>(null);

    // Initialize state
    useEffect(() => {
        // 1. Check LocalStorage for Mock Override
        const storedMock = typeof window !== 'undefined' ? localStorage.getItem('mockUserRole') : null;
        setMockRole(storedMock);

        loadUser(storedMock);

        // Listen for custom event to trigger re-render on role switch
        const handleRoleChange = () => {
            const newRole = localStorage.getItem('mockUserRole');
            setMockRole(newRole);
            loadUser(newRole);
        };

        window.addEventListener('auth-role-change', handleRoleChange);
        return () => window.removeEventListener('auth-role-change', handleRoleChange);
    }, []);

    const loadUser = async (currentMockRole: string | null) => {
        setLoading(true);

        // A. If Mock Role is active and valid, use it
        if (currentMockRole && MOCK_USERS[currentMockRole as keyof typeof MOCK_USERS]) {
            const mockData = MOCK_USERS[currentMockRole as keyof typeof MOCK_USERS];
            setUser(mockData);
            setLoading(false);
            return;
        }

        // B. If 'guest' is explicitly selected
        if (currentMockRole === 'guest') {
            setUser(null);
            setLoading(false);
            return;
        }

        // C. Fallback to Real Supabase Auth
        const { data: { user: supabaseUser } } = await supabase.auth.getUser();

        if (supabaseUser) {
            // Fetch real role
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', supabaseUser.id)
                .single();

            setUser({
                id: supabaseUser.id,
                email: supabaseUser.email,
                role: profile?.role || 'member'
            });
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    const switchMockRole = (roleKey: string | null) => {
        if (roleKey) {
            localStorage.setItem('mockUserRole', roleKey);
        } else {
            localStorage.removeItem('mockUserRole');
        }
        // Dispatch event so other components update immediately
        window.dispatchEvent(new Event('auth-role-change'));
    };

    const logout = async () => {
        // 1. Clear Mock Role
        localStorage.removeItem('mockUserRole');

        // 2. Clear Real Auth
        await supabase.auth.signOut();

        // 3. Force "guest" state
        setUser(null);
        setMockRole(null);

        // 4. Notify components
        window.dispatchEvent(new Event('auth-role-change'));

        // 5. Force reload to guest mode if needed, or ensure "guest" is selected in dropdown
        // (The hook logic will reloadUser(null) effectively)
    };

    return { user, loading, mockRole, switchMockRole, logout };
}
