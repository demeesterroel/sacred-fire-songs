# Project Analysis & Design Document: Song Sharing Application (Sacred Fire Songs)

**Version:** 1.16
**Status:** Living Document
**Date:** January 11, 2026

## Changelog

| Version | Date | Description of Changes | 
| ----- | ----- | ----- | 
| **1.0** | Oct 26, 2023 | Initial Document Creation. Defined User Personas, Core Requirements, Domain Model, and Tech Stack. | 
| **...** | ... | (Previous versions 1.1 - 1.13 retained in history) |
| **1.14** | Dec 29, 2025 | **Major Update:** Aligned document with Day 9 Implementation. Added `TanStack Query` to architecture. Verified `compositions` and `song_versions` schema. Marked Phase 1 features as Implemented. |
| **1.15** | Jan 10, 2026 | Changed project name to Sacred Fire Songs. Updated references to community name. |
| **1.16** | Jan 11, 2026 | Implemented Edit Song, Access Denied, Mock Auth & Logout. Updated Screen Inventory. |

## 1. Introduction

### 1.1 Purpose
The purpose of this application is to centralize, preserve, and share the medicine songs (Icaros, ceremonial songs) of the Sacred Fire community. It serves as a digital songbook that bridges the gap between oral tradition and accessibility.

### 1.2 Scope
The application is a **Progressive Web App (PWA)** optimized for mobile use during ceremonies (dark mode, offline capable).
* **It IS:** A collaborative library for lyrics and chords.
* **It IS NOT:** A music streaming service.

### 1.3 Key Definitions
* **ChordPro:** A text-based format (`Example [Am]Chord`) used for rendering.
* **Song:** A "Composition" entity containing metadata (Title, Author).
* **Version:** A specific arrangement of a Song (e.g., "Capo 2", "Simplified").

## 2. User Analysis

### 2.1 User Personas
1.  **The Guitarero (Musician):** Needs accurate chords, transposition, and offline access.
2.  **The Singer:** Needs clear lyrics and melody reference.
3.  **The Guardian:** Ensures cultural respect and accuracy.

## 3. Functional Requirements

### 3.1 Song Library & Discovery
* **[Implemented] Lazy List:** Efficient fetching of song titles.
* **[Implemented] Search:** Real-time filtering by Title and Author.
* **[Planned] Taxonomy:** Filtering by Category (Water, Fire) deferred to later phases.

### 3.2 The Song Viewer
* **[Implemented] ChordPro Rendering:** Custom parser renders chords above lyrics.
* **[Implemented] Version Switching:** UI pills to toggle between versions.
* **[Implemented] Transposition:** (Foundation laid in logic, UI pending).

### 3.3 Offline Support
* **[Implemented] PWA:** Installable on mobile.
* **[Implemented] Caching:** `Stale-While-Revalidate` strategy via TanStack Query ensures songs work offline after first visit.

## 4. Roadmap Status

### Phase 1: The Bare Essentials (MVP) - [COMPLETED]
* **[x] Foundation:** Next.js + Tailwind Setup.
* **[x] Database:** Supabase connected with RLS.
* **[x] Public Library:** Home screen with Search.
* **[x] Song Viewer:** Dynamic routing `[id]` and ChordPro rendering.
* **[x] Navigation:** Persistent Header and Back Button integration.

### Phase 2: Minimal Lovable Product (MLP) - [IN PROGRESS]
* **[ ]** Transposition: UI controls to shift keys.
* **[ ]** Melody: ABC Notation rendering.
* **[x]** Rich Editing: Create/Edit Songs (Owner/Admin).

### Phase 3 & 4 (Future)
* User Accounts, Favorites, Setlists, PDF Export.

## 5. Domain & Data Model (Implemented Codebase)

### 5.1 Schema: `public`

#### **A. compositions** (The Song Identity)
* `id`: uuid (PK)
* `title`: text
* `original_author`: text
* `created_at`: timestamptz

#### **B. song_versions** (The Content)
* `id`: uuid (PK)
* `composition_id`: uuid (FK -> compositions.id)
* `version_name`: text (e.g., "Standard", "Capo 2")
* `content_chordpro`: text (The raw lyrics/chords)
* `key`: text (e.g., "Am")
* `created_at`: timestamptz

*(Categories and Setlists tables are designing but not yet implemented).*

## 6. System Architecture

### 6.1 Technology Stack
* **Framework:** **Next.js 15** (App Router).
* **Styling:** **Tailwind CSS**.
* **Fonts:** **Geist Sans** / **Geist Mono**.
* **Icons:** **Lucide React**.
* **Animations:** **Framer Motion** (Page transitions, micro-interactions).
* **Backend:** **Supabase** (PostgreSQL, Auth, RLS).
* **State Management:** **TanStack Query (React Query)** for server-state caching.
* **Hosting:** **Vercel**.

### 6.2 Offline Strategy
* **React Query:** Configured with `staleTime: 5 minutes` and `gcTime: 24 hours`.
* **Browser Cache:** Assets cached via Vercel headers.

## 7. Screen Inventory (Implemented)

### 7.1 Screen 1: Home (Library)
* **Status:** Implemented (`app/page.tsx`).
* **Features:** Search Bar, Scrollable List, Song Cards with Gradient/Colors.

### 7.2 Screen 2: Song Detail
* **Status:** Implemented (`app/songs/[id]/page.tsx`).
* **Features:** Sticky Header with Back Button, Version Pills, ChordPro Display.

### 7.3 Screen 3: Login
* **Status:** Mockup Only (Doc). Implementation Pending.

### 7.4 Screen 4: Add Song
* **Status:** Implemented (`app/songs/add/page.tsx`).
* **Features:** Reuseable `SongForm`, Client-Side Access Control.

### 7.5 Screen 5: Edit Song
* **Status:** Implemented (`app/songs/[id]/edit/page.tsx`).
* **Features:** Route Protection (Owner/Admin), Data Prefill, Save Mutation.

### 7.6 Screen 6: Access Denied
* **Status:** Implemented (`components/common/AccessDenied.tsx`).
* **Features:** Visual error page for unauthorized edit attempts.
