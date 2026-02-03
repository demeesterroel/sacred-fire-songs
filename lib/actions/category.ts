'use server';

import { createClient } from '@/lib/supabase/server';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  parent_name?: string;
}

export async function getAvailableCategories(): Promise<Category[]> {
  const supabase = await createClient(); // Await createClient in server actions if using newer Next/Supabase helpers, check usage elsewhere. 
  // Usually createClient() is sync in some versions, async in others.
  // Let's check `lib/supabase/server.ts` to be sure.
  // For now assuming async as it usually involves cookies.

  const { data, error } = await supabase
    .from('categories')
    .select(`
            id,
            name,
            slug,
            parent_id,
            parent:parent_id (
                name
            )
        `)
    .not('parent_id', 'is', null) // Only fetch subcategories as per constraint
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Transform to flat structure with parent_name
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    parent_id: item.parent_id,
    parent_name: item.parent?.name || 'Other'
  })).sort((a, b) => {
    // Sort by parent name then category name
    if (a.parent_name < b.parent_name) return -1;
    if (a.parent_name > b.parent_name) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}
