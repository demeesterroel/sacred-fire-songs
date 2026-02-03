-- Ensure RLS is enabled
alter table public.song_category_map enable row level security;
-- 1. Allowed Read Access (Public)
drop policy if exists "Public read access for song_category_map" on public.song_category_map;
create policy "Public read access for song_category_map" on public.song_category_map for
select to public using (true);
-- 2. Allowed Insert Access (Owners & Admins)
drop policy if exists "Owners/Admins can insert song categories" on public.song_category_map;
create policy "Owners/Admins can insert song categories" on public.song_category_map for
insert to authenticated with check (
    exists (
      select 1
      from public.compositions
      where id = song_category_map.song_id
        and (
          owner_id = auth.uid()
          or exists (
            select 1
            from public.profiles
            where id = auth.uid()
              and role = 'admin'
          )
        )
    )
  );
-- 3. Allowed Delete Access (Owners & Admins)
drop policy if exists "Owners/Admins can delete song categories" on public.song_category_map;
create policy "Owners/Admins can delete song categories" on public.song_category_map for delete to authenticated using (
  exists (
    select 1
    from public.compositions
    where id = song_category_map.song_id
      and (
        owner_id = auth.uid()
        or exists (
          select 1
          from public.profiles
          where id = auth.uid()
            and role = 'admin'
        )
      )
  )
);