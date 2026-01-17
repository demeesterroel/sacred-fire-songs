'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteSong(id: string) {
    const supabase = await createClient();

    // 1. Verify User is Admin (Double check on server side)
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Unauthorized' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'Forbidden: Admins only' };
    }

    // 2. Perform Delete (RLS will also enforce this, but good to be explicit)
    const { error } = await supabase
        .from('compositions')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Delete Error:', error);
        return { error: error.message };
    }

    // 3. Revalidate and Redirect
    revalidatePath('/');
    redirect('/');
}
