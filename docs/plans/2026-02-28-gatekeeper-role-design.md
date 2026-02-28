# Gatekeeper Role — Design Document

**Version:** 1.0
**Date:** February 28, 2026
**Status:** Approved

---

## Goal

Introduce a **Gatekeeper** role that sits between Musician and Admin. Gatekeepers curate the song library and playlists: they flag quality issues, merge duplicates, enrich metadata, and surface featured content — without having the destructive power to permanently delete.

## Role Hierarchy

```
Guest → Member → Musician → Gatekeeper → Admin
```

## Permissions

| Capability | Guest | Member | Musician | Gatekeeper | Admin |
|---|:---:|:---:|:---:|:---:|:---:|
| Browse & search | ✅ | ✅ | ✅ | ✅ | ✅ |
| Add / edit own songs | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit metadata & media links on **any** song | ❌ | ❌ | ❌ | ✅ | ✅ |
| Edit lyrics/chords on songs they don't own | ❌ | ❌ | ❌ | ❌ | ✅ |
| Flag songs (`needs_improvement`, `duplicate`) | ❌ | ❌ | ❌ | ✅ | ✅ |
| Access Gatekeeper queue dashboard | ❌ | ❌ | ❌ | ✅ | ✅ |
| Merge duplicate songs into versions | ❌ | ❌ | ❌ | ✅ | ✅ |
| Feature / unfeature public playlists | ❌ | ❌ | ❌ | ✅ | ✅ |
| Delete songs permanently | ❌ | ❌ | ❌ | ❌ | ✅ |
| Manage users & roles | ❌ | ❌ | ❌ | ❌ | ✅ |

## Feature Areas

### A. Content Flagging & Improvement Queue

- Songs can be flagged with one of two statuses: `needs_improvement` or `duplicate`
- A visible badge appears on the song card and detail page for all users
- All flagged songs appear in a private **Gatekeeper queue** — a dashboard view grouped by flag type and sortable by date
- When a song is flagged, the original poster receives an **in-app notification** explaining what needs attention (e.g. "Your song 'Grandmother Earth' has been flagged as needing improvement")
- When a flag is resolved (unflagged or merged), the original poster is notified again

### B. Metadata & Media Editing

- Gatekeepers can edit the following fields on any song:
  - YouTube, SoundCloud, Spotify URLs
  - Song key and capo
  - Categories / tags
- Lyrics and ChordPro content are **not** editable by Gatekeepers
- Changes are saved immediately with no approval flow
- The song detail page shows "Last updated by [name]" attribution

### C. Duplicate Merging

- From the Gatekeeper queue or a song detail page, a Gatekeeper can select "Merge with…"
- A search picker lets them select the canonical (primary) song
- The secondary song becomes an alternate version linked to the canonical entry
- Both original contributors are notified of the merge with the canonical song link
- The merged/secondary song URL redirects to the canonical entry

### D. Featured Playlists

- Gatekeepers can toggle a **Featured** flag on any public playlist via the context menu
- The `/library/playlists` page gains a **"Featured"** section above the existing "Public Playlists" section
- Featured playlists are visible to all users including guests
- The Featured section is hidden when no playlists are featured

## Data Model Notes

- `profiles.role` gains a new value: `'gatekeeper'`
- `compositions` gains a `flag_status` column: `null | 'needs_improvement' | 'duplicate'`
- `compositions` gains a `flagged_by` (uuid, FK profiles) and `flagged_at` (timestamptz) column
- `setlists` gains an `is_featured` boolean column (default false)
- A new `notifications` table (or use an existing pattern) for in-app messages to original posters

## Out of Scope

- Gatekeepers cannot edit lyrics or ChordPro content
- Permanent deletion always requires Admin
- No public-facing Gatekeeper profile or badge (internal role only)
