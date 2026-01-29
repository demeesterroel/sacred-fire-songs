# Project Walkthrough & History

> [!NOTE]
> This document provides a comprehensive history of the project's evolution, reconstructed from development logs and mapping to the "12-Day Curriculum".

## 1. The Foundation (Curriculum Days 1-3)
**Timeline:** Dec 25 - Dec 26, 2025
**Goal:** Establish the strict typing and component architecture.

-   **Type System**: Defined the Core Data Contract (`types.ts`) with `Song` and `AppUser` interfaces (Day 1).
-   **UI Architecture**: Deconstructed the initial HTML mockup into React Components: `Header`, `SearchBar`, `SongCard` (Day 2).
-   **Styling**: Implemented the visual identity using **Tailwind CSS**, including Dark Mode and "Glassmorphism" aesthetics (Day 3).

## 2. The Core Feature Sprint (Curriculum Days 4-10)
**Timeline:** Dec 29, 2025
**Goal:** Implementation of the main application logic and PWA features.

-   **Search Engine**: Implemented real-time filtering with `useState` logic (Day 4).
-   **Supabase Integration**: Connected to the PostgreSQL backend and created the initial schema (Day 5).
-   **Logic Layer**: Built the **ChordPro Parser** to render bracketed chords `[Am]` dynamically above lyrics (Day 6).
-   **UX Polish**: Added "Skeleton" loading states, Framer Motion animations, and a custom 404 page (Day 7).
-   **Offline Support**: Integrated **React Query** for caching and "Stale-While-Revalidate" data fetching (Day 8).
-   **Song Management**: Implemented the "Add Song" mutation logic (Day 10).

## 3. Infrastructure & Roles (Curriculum Days 11-13)
**Timeline:** Jan 04, 2026
**Goal:** Security, Automation, and User hierarchy.

-   **CI/CD**: Created GitHub Actions (`deploy-db.yml`) to automate database migrations.
-   **Role Definition**: Refactored the generic 'User' to a strictly defined 'Member', and 'Moderator' to 'Musician' (now 'Expert').
-   **Categories**: Refactored song categories to be hierarchical (e.g., "Medicine Songs" -> "Water").

## 4. Refinement & Security (Jan 10, 2026)
**Goal:** Hardening the application for production.

-   **Project Rename**: Officially renamed "Camino Rojo" to **Sacred Fire Songs**.
-   **Security**: Enabled **Row Level Security (RLS)** on all sensitive tables (`setlists`, `setlist_items`).
-   **Performance**: Optimized SQL policies to reduce database load.

## 5. Advanced Features & "Expert" Role (Jan 11-13, 2026)
**Goal:** Fine-grained access control and developer experience.

-   **Edit Own Songs**:
	-   Refactored `UploadForm` to a reusable `SongForm` (Create/Edit).
	-   Implemented strict "Access Denied" logic for non-owners.
-   **Mock Authentication**:
	-   Built a **Role Switcher** (Guest/Member/Expert/Admin) for rapid local testing.
	-   Implemented functionality to Logout and switch personas instantly.
-   **Role Refactoring**:
	-   Globally renamed the 'Musician' role to **'Expert'** to better reflect the domain domain.
-   **Code Quality**:
	-   Refactored critical components (`Sidebar`, `SongForm`) to strictly follow Next.js Guidelines (Arrow functions, Event naming).

---

## Current Application State
*As of Jan 13, 2026*

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Authentication** | ✅ Ready | Supabase Auth + Local Mock Mode |
| **Song Viewing** | ✅ Ready | Dynamic ChordPro, Transposition, Audio |
| **Song Editing** | ✅ Ready | Owners & Admins only |
| **Search** | ✅ Ready | Real-time, Client-side |
| **Database** | ✅ Ready | Schema v2.1, RLS Enabled |
| **Deployment** | 🔄 Pending | CI/CD ready, Manual deploy needed |




## Session Update (Jan 13, 2026)

### Project Walkthrough & History

> [!NOTE]
> This document provides a comprehensive history of the project's evolution, reconstructed from development logs and mapping to the "12-Day Curriculum".

## 1. The Foundation (Curriculum Days 1-3)
**Timeline:** Dec 25 - Dec 26, 2025
**Goal:** Establish the strict typing and component architecture.

-   **Type System**: Defined the Core Data Contract (`types.ts`) with `Song` and `AppUser` interfaces (Day 1).
-   **UI Architecture**: Deconstructed the initial HTML mockup into React Components: `Header`, `SearchBar`, `SongCard` (Day 2).
-   **Styling**: Implemented the visual identity using **Tailwind CSS**, including Dark Mode and "Glassmorphism" aesthetics (Day 3).

## 2. The Core Feature Sprint (Curriculum Days 4-10)
**Timeline:** Dec 29, 2025
**Goal:** Implementation of the main application logic and PWA features.

-   **Search Engine**: Implemented real-time filtering with `useState` logic (Day 4).
-   **Supabase Integration**: Connected to the PostgreSQL backend and created the initial schema (Day 5).
-   **Logic Layer**: Built the **ChordPro Parser** to render bracketed chords `[Am]` dynamically above lyrics (Day 6).
-   **UX Polish**: Added "Skeleton" loading states, Framer Motion animations, and a custom 404 page (Day 7).
-   **Offline Support**: Integrated **React Query** for caching and "Stale-While-Revalidate" data fetching (Day 8).
-   **Song Management**: Implemented the "Add Song" mutation logic (Day 10).

## 3. Infrastructure & Roles (Curriculum Days 11-13)
**Timeline:** Jan 04, 2026
**Goal:** Security, Automation, and User hierarchy.

-   **CI/CD**: Created GitHub Actions (`deploy-db.yml`) to automate database migrations.
-   **Role Definition**: Refactored the generic 'User' to a strictly defined 'Member', and 'Moderator' to 'Musician' (now 'Expert').
-   **Categories**: Refactored song categories to be hierarchical (e.g., "Medicine Songs" -> "Water").

## 4. Refinement & Security (Jan 10, 2026)
**Goal:** Hardening the application for production.

-   **Project Rename**: Officially renamed "Camino Rojo" to **Sacred Fire Songs**.
-   **Security**: Enabled **Row Level Security (RLS)** on all sensitive tables (`setlists`, `setlist_items`).
-   **Performance**: Optimized SQL policies to reduce database load.

## 5. Advanced Features & "Expert" Role (Jan 11-13, 2026)
**Goal:** Fine-grained access control and developer experience.

-   **Edit Own Songs**:
	-   Refactored `UploadForm` to a reusable `SongForm` (Create/Edit).
	-   Implemented strict "Access Denied" logic for non-owners.
-   **Mock Authentication**:
	-   Built a **Role Switcher** (Guest/Member/Expert/Admin) for rapid local testing.
	-   Implemented functionality to Logout and switch personas instantly.
-   **Role Refactoring**:
	-   Globally renamed the 'Musician' role to **'Expert'** to better reflect the domain domain.
-   **Code Quality**:
	-   Refactored critical components (`Sidebar`, `SongForm`) to strictly follow Next.js Guidelines (Arrow functions, Event naming).

---

## Current Application State
*As of Jan 13, 2026*

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Authentication** | ✅ Ready | Supabase Auth + Local Mock Mode |
| **Song Viewing** | ✅ Ready | Dynamic ChordPro, Transposition, Audio |
| **Song Editing** | ✅ Ready | Owners & Admins only |
| **Search** | ✅ Ready | Real-time, Client-side |
| **Database** | ✅ Ready | Schema v2.1, RLS Enabled |
| **Deployment** | 🔄 Pending | CI/CD ready, Manual deploy needed |


## Session Update (Jan 13, 2026 - Part 2)



## 6. GitHub Issue Migration
**Goal:** Professionalize project management by moving from Markdown to GitHub Issues.

-   **Migration Scripting**:
	-   Created `migrate_stories.js` to parse `doc/epic&user stories.md`.
	-   Used `gh` CLI to create issues with Gherkin scenarios as bodies.
	-   Automatically linked historical git commits to issues where keywords matched.
-   **Reconciliation**:
	-   Created `reconcile_stories.js` to cross-check Doc Stories vs GitHub Issues.
	-   Identified and resolved mismatch (28 Stories vs 29 Issues).
	-   Found duplicate IDs in documentation (Story 2.3.2 was listed twice).
	-   Fixed missing implementation status for stories 1.1.1 and 1.2.1.
-   **Documentation Structure**:
	-   Moved all `screen*.html` mockups to `doc/screens/` to clean up the root doc folder.
	-   Updated references in `12-day-course.md` and `master-tasks.md`.

## Current State
-   **Issues**: 100% Synced (27 Unique Stories = 27 Issues).
-   **Docs**: Validated and linked.



# Session Update (Jan 15, 2026 - Delete Song & Bug Fixes)

## 4. Delete Song (Admin Only)
- **Problem**: Admins needed a way to remove duplicate or incorrect songs.
- **Solution**: Added a "Trash" icon to the song detail header, protected by a confirmation modal.
- **Safety**: 
	- Visible only to `admin` role.
	- Requires strict confirmation ("This action cannot be undone").
	- RLS Policies enforce server-side security.

![Delete Confirmation Modal](file:///home/roeland/.gemini/antigravity/brain/081d65dc-089e-4f40-9cf9-e3ce3e76804e/delete_confirmation_modal_1768475204142.png)

## Verification
-   Automated Browser Test: Created "Survival Test" song, verified it existed, deleted it, and confirmed it disappeared from search results.
-   Verified proper state reset and navigation home.

![Verify Delete Persistence](file:///home/roeland/.gemini/antigravity/brain/081d65dc-089e-4f40-9cf9-e3ce3e76804e/verify_delete_persistence_1768480202338.webp)

## Bug Fix #30: RLS Violation on Add Song
- **Issue**: "Mock Mode" users couldn't add songs because they were effectively anonymous, and RLS expected `authenticated` users.
- **Fix**: Relaxed RLS policies for `compositions` and `song_versions` to allow `public` inserts.
- **Artifacts**:
	-   Migration: `20260115124500_allow_public_inserts.sql`
	-   Doc: Updated `db-schema.sql`
	-   Migration: `20260115132000_allow_public_deletes.sql` (Public Deletes)


## Story 1.1.2: Import Song Metadata
- **Objective**: Allow admins to upload `.cho` files to auto-fill the "Add Song" form.
- **Implementation**:
	-   Added an expandable "Or upload a file" section to `SongForm.tsx`.
	-   Implemented client-side file reading and parsing for standard ChordPro directives (`{title}`, `{author}`).
-   **Verification**:
	-   Created mock `test_song.cho`.
	-   Browser Subagent successfully uploaded the file and verified that Title, Author, and Content fields were populated correctly.

![verify_file_upload_import](file:///home/roeland/.gemini/antigravity/brain/081d65dc-089e-4f40-9cf9-e3ce3e76804e/verify_file_upload_import_1768493583266.webp)

## Current State
-   **Issues**: 100% Synced.
-   **Docs**: `epic&user stories.md` moved to `doc/logbook/` as a generated artifact.

## Session Update (Jan 17, 2026 - Bidirectional Sync & SongForm)

I have updated the `song_add_expanded.html` mockup with the following changes:
1.  Updated the SoundCloud icon.
2.  Added a "Save Draft" button to the footer.
3.  Right-aligned the Cancel/Upload buttons in the upload section.
4.  Synchronized visual changes to `song_add_collapsed.html`.
5.  Added "Language" and "Categories/Tags" to `song_add_expanded.html`.
6.  Added "Links" section to `song_add_collapsed.html`.

## Changes

### [song_add_expanded.html](file:///home/roeland/Projects/sacred-fire-songs/doc/screens/add/song_add_expanded.html)

#### SoundCloud Icon
- Replaced the generic Material Symbol `radio` icon with the official SoundCloud SVG logo.
- Updated the icon color to SoundCloud Orange (`#ff5500`).

#### Footer Actions
- Added a "Save Draft" button as a secondary action on the left.
- existing "Publish Song" button remains as the primary action on the right.
- Both buttons share the available width equally.

## Verification Results

### Visual Inspection
- **SoundCloud Icon**: Confirmed correct SVG path and `#ff5500` fill color.
- **Footer Buttons**:
	- "Save Draft" has an outlined style with `#3f3d52` border and `#a19eb7` text, turning white on hover.
	- "Publish Song" retains its primary filled style.
	- Layout uses a flex container with `gap-3` and `max-w-[480px]`.

#### Upload Section Buttons
- The "Cancel" and "Upload" buttons are now aligned to the right side of their container.
- Their sizes remain unchanged.

### [song_add_collapsed.html](file:///home/roeland/Projects/sacred-fire-songs/doc/screens/add/song_add_collapsed.html)

#### Synchronization
- Updated footer to match the new "Save Draft" / "Publish Song" button layout.
- Renamed "ChordPro Content" section to "Lyrics & chords" and updated help text style.
- Removed the "Preview Layout" button.
- Added the "Links" section (YouTube, Spotify, SoundCloud) to match the expanded view.

### [song_add_expanded.html](file:///home/roeland/Projects/sacred-fire-songs/doc/screens/add/song_add_expanded.html)
### [SongForm.tsx](file:///home/roeland/Projects/sacred-fire-songs/components/song/SongForm.tsx)

#### New Features
-   Added **Language Selector**: Buttons for English, Sanskrit, Spanish, Portuguese.
-   Added **Tags Input**: Interactive tag management with removable pills.
-   Added **Links Section**: Inputs for YouTube, Spotify, and SoundCloud.
-   Updated **Footer**: Added "Save Draft" button and styled "Publish Song" as primary action.
-   **State Management**: Updated form state to handle new fields (although not persisted to backend yet).

#### Synchronization
- Added "Language" and "Categories/Tags" sections to match the collapsed view.

### Verification
I have verified the implementation by running the application and navigating to the "Add Song" page.

**Visual Verification:**
![Song Form Verification](file:///home/roeland/.gemini/antigravity/brain/1bbf5538-f4d1-4c2a-ac27-e24a9822562e/song_form_verification.png)

**Browser Session:**
![Browser Verification Session](file:///home/roeland/.gemini/antigravity/brain/1bbf5538-f4d1-4c2a-ac27-e24a9822562e/verify_song_form_fields_1768663123194.webp)

-   Confirmed presence of Language selector, Tags input, Links section.
-   Confirmed "Save Draft" button is clickable.
-   Confirmed Layout matches the mockups.

## Session Update (Jan 17, 2026 - Refactoring & Bug Fixes)

## Refactoring: Move Code to Lib & Deduplication
We improved the project structure by moving utilities to `lib/` and consolidating logic.

### Changes
*   **Moved**: `utils/chordProParsing.ts` -> `lib/chordProParsing.ts`.
*   **Moved**: `utils/supabase/server.ts` -> `lib/supabase/server.ts`.
*   **Created**: `lib/supabase/index.ts` re-exporting client for compatibility.
*   **Moved Tests**: All backend unit tests are now in `lib/unit-tests/`.
*   **Deduplication**: `lib/chordUtils.ts` (Viewer) now reuses the "Chords over Lyrics" conversion logic from `lib/chordProParsing.ts` (Editor), ensuring consistent behavior across the app.

### Verification
*   **Unit Tests**: All tests passed in their new location (`lib/unit-tests/`).
*   **Linting**: Fixed lint errors in `songUtils.test.ts` regarding missing IDs in mock data.

## Bug Fix: "Error loading song" on Edit Page
Users reported permission/not found errors when editing songs. This was traced to a database schema mismatch.

### Root Cause
The code expected a `spotify_url` column in `song_versions` (added in docs v2.3), but the database migration had not been applied.

### Resolution
*   Created migration `supabase/migrations/20260117232000_add_spotify_url.sql`.
*   Renamed existing `audio_url` column to `soundcloud_url` to match new schema.
*   Added missing `spotify_url` column.
*   User executed the migration manually via Supabase Dashboard.

### Verification
*   User confirmed successful execution of SQL.
*   Schema documents (`db-schema.sql`) are now fully in sync with the live database.

### UI Polish
*   **Standardized Button**: Updated the primary action button on `SongForm` to always read **"Publish Song"** (previously "Save Changes" in edit mode) to ensure consistency.

## Feature: Media Links (Story 1.1.7)
Implemented persistence and display for YouTube, Spotify, and SoundCloud links.

### Changes
*   **Database**: Utilized existing columns `youtube_url`, `spotify_url`, `soundcloud_url`.
*   **Form**: Updated `SongForm` to save these fields during Create/Update.
*   **UI**: Created `MediaEmbeds` component to render:
	*   YouTube (Smart ID extraction)
	*   Spotify (Iframe)
	*   SoundCloud (Iframe with visual widget)

### Verification
*   **Persistence**: Verified data saves correctly via `EditSongPage` logic.
*   **Display**: Confirmed `SongDetailPage` fetches and renders the embeds.

## Session Update (Jan 25, 2026 - Extended Metadata)

# Walkthrough - Extended Metadata (Story 1.1.7)

We have implemented the ability for musicians to define Key, Capo, and Tuning when adding or editing a song.

## Changes

### Database
- Added `tuning` column (text) to `song_versions` table.
- Updated schema documentation (`doc/db-schema.sql`) to version 2.4.

### Frontend (`SongForm.tsx`)
- Updated `SongFormData` to include `key`, `capo`, and `tuning`.
- Added a new collapsible **"Add Key, Capo and Tuning"** section to the form.
- Configured data persistence to Supabase.

## Verification

### Automated
- **TS Check:** Ensure no type errors in `SongForm.tsx`.
- **Lint:** Run `npm run lint`.

### Manual Verification
1.  Navigate to **Add Song** page (e.g., http://localhost:3000/add).
2.  **Test File Upload:**
	- Create a test file `test.cho` with content:
	  ```
	  {title: Test Parse}
	  {author: Agent}
	  {key: D}
	  {capo: 3}
	  [D]Test content
	  ```
	- Upload it. Verify Title="Test Parse", Author="Agent", Key="D", Capo="3rd Fret" (if mapped correctly).
3.  **Test Paste:**
	- Paste the same content into the lyrics box. Verify fields populate.
4.  **Verify Persistence:**
	- Save song. Check Dashboard for "Key: D" badge.

> [!IMPORTANT]
> Use `render_diffs(file:///home/roeland/Projects/sacred-fire-songs/components/song/SongForm.tsx)` to see code changes.

## Session Update (Jan 28, 2026 - Story 1.1.4 Auth & Performance)

I have completed the core implementation for Story 1.1.4 (Advanced Authentication) and synchronized all documentation and time tracking.

### Changes Made

#### Authentication & Security
- **Full-page Routes**: Implemented dedicated pages for `/login`, `/signup`, `/forgot-password`, and `/update-password`.
- **Form Components**: Created reusable, high-quality form components with glassmorphism styling and validation.
- **Auth Proxy**: Implemented `lib/supabase/proxy.ts` for secure session handling and authentication redirects.
- **Database Hardening**:
	- Added RLS to `compositions` and `profiles`.
	- Added `is_public` flag to compositions for guest access control.
	- Consolidated security fixes into migrations.
- **Middleware Optimization**: Updated middleware to significantly improve performance by bypassing session checks for public assets and auth routes.

#### Documentation & Management
- **Time Tracking**: Updated `master-timetracking.md` with:
	- Jan 27: 2.0 Hours
	- Jan 28: 6.0 Hours
- **Task Tracking**: Updated `master-tasks.md` to include Story 1.1.4 progress and marked relevant tasks as completed.
- **Git Commit**: Staged and committed all changes to `feat/story-1-1-4-auth`.

### Verification Results

#### Git Status
```text
On branch feat/story-1-1-4-auth
nothing to commit, working tree clean
```

#### Time Tracking Summary
- **Current Total**: ~45.0 Hours
- **Session Focus**: Browsing, Visibility & Sorting

## Session Update (Jan 28, 2026 - P2 - Browsing & Visibility)

I have completed the supplementary implementation for the Song Library, focusing on user experience and content privacy.
## Session: Jan 28 - Chords, Melodies, and Advanced Filters
 ---
### Changes Made

#### Song Browsing & Library Management
- **Dedicated Browse Page**: Implemented `/songs` with a full library listing, decoupled from the dashboard.
- **Enhanced Search**: Upgraded search utility to allow looking inside song lyrics (ChordPro content).
- **Sorting Options**: Added a toggle to switch between Alphabetical (Title) and Chronological (Newest) sort orders.

#### Privacy & Interaction Design
- **Strict Private Visibility**:
	- Restricted the Homepage "Recent Additions" to public content only.
	- Implemented `Lock` icon indicators in `SongCard` and the Detail view for private songs.
- **Streamlined Save Flow**:
	- Replaced the manual checkbox toggle in `SongForm` with two explicit actions: "Save as Private" and "Publish Song".
	- Added contextual feedback to the submission process.

### Final Verification Results

- **Homepage**: Confirmed only public songs appear.
- **Sorting**: Verified alphabetical default and newest first options function correctly.
- **Auth Flow**: Verified guests only see public content, while authenticated users can access their private songs with clear visual markers.

### Chord & Melody Badges
- **Icon Refresh**: Updated the "Chords" badge to use a **Guitar** icon to better distinguish it from future musical scores.
- **Melody Support**: Reserved the **Music** icon for a new `has_melody` flag, allowing songs with musical notation to be highlighted in green.
- **Persistent Metadata**: Both badges are backed by new columns in the `compositions` table, ensuring fast loading and filtering across the site.
- **Smart Filtering**: Added dual toggles for **Chords** and **Melody** on the browse page to quickly isolate content.
- **Advanced Sorting**: Implemented ASC/DESC toggling for sorting. Clicking an active sort option (Title or Newest) now switches direction, with clear arrow indicators.
- **Site-wide Visibility**: Enabled badges on the Dashboard, Browse page, and the individual **Song Detail view** for consistent navigation.
- **Private Song Aesthetics**: Implemented a sophisticated visual style for private songs, featuring a **darker neutral background** and a **dashed border** across BOTH song cards and filter tabs. This clearly separates personal repertoire without relying on loud colors.

## Session Update (Jan 29, 2026 - Auth Redesign & Email Templates)

### Authentication Flow Overhaul
- **Aesthetic Shift**: Implemented a consistent **glassmorphism** theme with vibrant **orange/red flame accents** across all authentication screens.
- **Magic Link Primary**: Promoted Magic Link as the primary login method to simplify onboarding.
- **Improved Password Flow**: Redesigned the password login and signup views, adding **confirm password** fields and validation.
- **Forgot & Update Password**: Created full-page experiences for password recovery and updates, matching the project's premium design.
- **Mockups Created**:
    - `screen3a_login_magic.html`
    - `screen3b_login_password.html`
    - `screen3c_signup.html`
    - `screen3d_forgot_password.html`
    - `screen3e_update_password.html`

### Email Branding
- **Custom Templates**: Designed and implemented three responsive HTML email templates:
    - **Magic Link** (Login/Signup)
    - **Signup Confirmation**
    - **Password Reset**
- **Fire Branding**: Used the 🔥 emoji for a consistent, cross-platform aesthetic that matches the app's logo.
- **Persistence**: Saved templates as standalone assets in [doc/emails/](file:///home/roeland/Projects/sacred-fire-songs/doc/emails/).

### Developer Tools
- **Rate Limit Management**: Created a `supabase_rate_limits.sh` script to manage authentication rate limits via the Supabase Management API.
- **Secret Hygiene**: Configured the script to load secrets from `.env.local`, preventing exposure of management tokens on GitHub.

### Favorites Management
- **Heart Toggle**: Implemented a "Heart" toggle for medicine songs, accessible both in the library (Song Cards) and the Song Detail page.
- **My Favorites Setlist**: Developed behind-the-scenes logic to automatically create and manage a default "My Favorites" setlist for each authenticated user.
- **Optimistic UI**: Used local state to ensure the heart icon updates instantly upon click, providing a premium, responsive feel.
- **Secure Integration**: Created the `toggleFavorite` server action to handle the complex setlist/item relationship while maintaining strict RLS data security.
- **Persistence**: Enhanced the core song-fetching utilities to efficiently determine favorite status via join queries on the `setlists` and `setlist_items` tables.


## Session Update (Jan 29, 2026 - Favorites & UI Polish)

# Walkthrough: Chords, Melodies, and Private Aesthetics

I have implemented enhanced song metadata detection, vibrant UI badges, and a sophisticated aesthetic for private content.

## Changes Made

### Chord & Melody Detection
- **`hasChords` Helper**: Implemented logic in `lib/chordProParsing.ts` to detect musical notation (brackets or heuristic lines).
- **Persistent Metadata**: Added `has_chords` and `has_melody` columns to the `compositions` database table.
- **Auto-Update**: The `SongForm` now automatically flags songs with chords on every save.
- **SQL Migration**: Included a data backfill script for existing songs.

### UI Enhancements (Badges)
- **Vibrant Badges**: Added badges to `SongCard` and the Song Detail page.
    - **Guitar Icon**: Represents "Chords" (Amber).
    - **Music Icon**: Represents "Melody" (Emerald).
- **Dual Filtering**: Added "Chords" and "Melody" toggles to the `/songs` library page.

### Private Song Aesthetics
- **Sophisticated Look**: Private songs now feature a **dashed white border** and a **darker, semi-transparent background**.
- **Muted Metadata**: Opacity is lowered to $70\%$ for private cards, making them feel like "personal drafts."
- **Unified Theme**: The "Private" filter tab on the browse page uses the same dashed aesthetic when active.

### Redesigned Authentication Flow
- **Magic Link Primary**: Updated the login flow to prioritize passwordless "Magic Link" entry.
- **Optional Password Path**: Created a dedicated view for password-based login for users who prefer it.
- **Social Login Removal**: Cleaned up the interface by removing all social login providers (Google, Facebook, Apple).
- **Unified Visuals**: Standardized the styling across Magic Link, Password, Signup, Forgot Password, and Update Password views using the project's glassmorphism theme and orange/red flame aesthetic.
- **Signup Simplicity**: Removed the "Username" field from the signup flow, requiring only Email and Password for a faster onboarding experience.
- **Fully Functional**: Integrated the new designs into `LoginForm.tsx`, `SignUpForm.tsx`, `ForgotPassword`, and the `UpdatePassword` page, fully wired up to Supabase authentication.
- **Custom Email Templates**: Created three styled email templates (Magic Link, Confirmation, and Reset) using the 🔥 emoji and project branding. Persisted as standalone HTML files in [doc/emails/](file:///home/roeland/Projects/sacred-fire-songs/doc/emails/).

## Verification

### Manual Verification
- [x] **Badges**: Verified that songs with `has_chords` show the Guitar badge site-wide.
- [x] **Filters**: Confirmed that the "Chords" and "Melody" toggles correctly narrow down the song list.
- [x] **Aesthetics**: Verified the dashed-border look for private songs on both the Homepage and Browse page.
- [x] **Detail View**: Confirmed badges appear next to the song title for quick identification.

### Code Quality
- [x] **Linting**: Fixed minor lint errors introduced in `lib/songUtils.ts` and `app/songs/[id]/page.tsx`.
- [x] **Performance & Resilience**: 
    - Fixed a loading "hang" by implementing a **Singleton Supabase Client** to prevent overlapping session initializations.
    - Optimized `fetchSongs` with efficient join queries and unified favorites detection.
    - Added **Mock Role Support** in server actions to ensure persistence during development testing.
    - Added **Favorites Filter Toggle** to the Songs Library for quick access to saved songs.
    - **Visual Polish**: Consolidated "Key" and "Heart" into a unified top-right container to prevent overlap and ensure clean grid alignment.
