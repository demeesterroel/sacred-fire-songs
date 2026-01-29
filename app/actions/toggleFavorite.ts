'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Toggles a song version in the user's "My Favorites" setlist.
 * If the setlist doesn't exist, it creates it.
 */
export async function toggleFavorite(songId: string, versionId?: string) {
  const supabase = await createClient();

  // 1. Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: 'Authentication required' };
  }

  // 2. Find or create "My Favorites" setlist
  let { data: setlist, error: setlistError } = await supabase
    .from('setlists')
    .select('id')
    .eq('owner_id', user.id)
    .eq('title', 'My Favorites')
    .single();

  if (setlistError && setlistError.code !== 'PGRST116') { // PGRST116 is "No rows found"
    return { error: 'Failed to access favorites list' };
  }

  if (!setlist) {
    const { data: newSetlist, error: createError } = await supabase
      .from('setlists')
      .insert({
        owner_id: user.id,
        title: 'My Favorites',
        description: 'My favorite medicine songs',
        is_public: false
      })
      .select('id')
      .single();

    if (createError) return { error: 'Failed to create favorites list' };
    setlist = newSetlist;
  }

  // 3. Resolve versionId if not provided (get first version of song)
  let targetVersionId = versionId;
  if (!targetVersionId) {
    const { data: firstVersion, error: versionError } = await supabase
      .from('song_versions')
      .select('id')
      .eq('composition_id', songId)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (versionError) return { error: 'Song content not found' };
    targetVersionId = firstVersion.id;
  }

  // 4. Check if already favorite
  const { data: existingItem, error: checkError } = await supabase
    .from('setlist_items')
    .select('id')
    .eq('setlist_id', setlist.id)
    .eq('song_version_id', targetVersionId)
    .single();

  if (existingItem) {
    // Remove from favorites
    const { error: deleteError } = await supabase
      .from('setlist_items')
      .delete()
      .eq('id', existingItem.id);

    if (deleteError) return { error: 'Failed to remove from favorites' };
  } else {
    // Add to favorites
    // Get max order index
    const { data: lastItem } = await supabase
      .from('setlist_items')
      .select('order_index')
      .eq('setlist_id', setlist.id)
      .order('order_index', { ascending: false })
      .limit(1)
      .single();

    const nextIndex = lastItem ? lastItem.order_index + 1 : 0;

    const { error: insertError } = await supabase
      .from('setlist_items')
      .insert({
        setlist_id: setlist.id,
        song_version_id: targetVersionId,
        order_index: nextIndex
      });

    if (insertError) return { error: 'Failed to add to favorites' };
  }

  revalidatePath('/');
  revalidatePath(`/songs/${songId}`);
  return { success: true, isFavorite: !existingItem };
}
