'use client';

import { createClient } from '@/lib/supabase/client';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
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

export const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [mockRole, setMockRole] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('mockUserRole');
        }
        return null;
    });

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
        const supabase = createClient();
        const { data: { user: supabaseUser } } = await supabase.auth.getUser();

        if (supabaseUser) {
            // Fetch real role
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
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

    // Initialize state
    useEffect(() => {
        const supabase = createClient();

        // Initial session check
        const initAuth = async () => {
            if (mockRole && mockRole !== 'guest') {
                await loadUser(mockRole);
                return;
            }

            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // If we have a session, we still might need the profile for the role
                // But for the sake of speed, we set the user immediately and fetch role in background
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    role: 'member' // Default until profile loads
                });

                // Load full profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                if (profile) {
                    setUser({
                        id: session.user.id,
                        email: session.user.email,
                        role: profile.role
                    });
                }
            }
            setLoading(false);
        };

        initAuth();

        // Listen for Auth Changes (e.g. login, logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', session.user.id)
                        .single();

                    setUser({
                        id: session.user.id,
                        email: session.user.email,
                        role: profile?.role || 'member'
                    });
                }
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setMockRole(null);
                localStorage.removeItem('mockUserRole');
            }
            setLoading(false);
        });

        // Listen for custom event to trigger re-render on role switch (Mock)
        const handleRoleChange = () => {
            const newRole = localStorage.getItem('mockUserRole');
            setMockRole(newRole);
            loadUser(newRole);
        };

        window.addEventListener('auth-role-change', handleRoleChange);

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('auth-role-change', handleRoleChange);
        };
    }, []);



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
        const supabase = createClient();
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
