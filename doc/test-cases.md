# Test Cases: Sacred Fire Songs

**Version:** 1.8
**Status:** Draft
**Date:** January 10, 2026

## Changelog

| Version | Date | Description of Changes |
| ----- | ----- | ----- |
| **1.0** | Dec 25, 2025 | Initial Document Creation. Derived test cases from Epics/Stories. |
| **1.1** | Dec 29, 2025 | Updated test examples to use real songs from `data/songs` (Agüita, Pachamama, Espíritu del agua). |
| **1.2** | Dec 29, 2025 | Cleaned up song titles in examples (removed file prefixes like "43."). |
| **1.3** | Dec 29, 2025 | Added TC-1.3.4 for Logo Navigation. |
| **1.4** | Dec 29, 2025 | Added TC-1.1.4 for Guest Upload Prompt. |
| **1.5** | Jan 10, 2026 | Changed project name to Sacred Fire Songs. |
| **1.6** | Jan 10, 2026 | Updated cases for Member Uploads and Owner Editing. |
| **1.7** | Jan 10, 2026 | Refactored "Upload" terminology to "Add Song". |
| **1.8** | Jan 10, 2026 | Added test cases for Non-Owner restriction and Admin override. |

This document contains the test cases derived from the project's Epics and User Stories. These cases are intended for both manual verification and as a blueprint for future automated testing.

## Phase 1: MVP - Core Management & Public Library

### 1.1 Song Management (Admin)

#### TC-1.1.1: Member adds valid ChordPro file
- **User Story**: 1.1.1
- **Pre-conditions**: Member is logged in, "Add Song" page is open.
- **Steps**:
    1. Select a valid `.cho` file (e.g., `43_Aguida.cho`).
    2. Click "Add Song".
- **Expected Results**:
    - "Song Added Successfully" message appears.
    - New song entry is created in the database.
    - Song title "Agüita" is visible in the library.

#### TC-1.1.2: Admin deletes a song
- **User Story**: 1.1.2
- **Pre-conditions**: Admin is logged in, viewing the song list.
- **Steps**:
    1. Click the "Delete" icon on a specific song (e.g., "Pachamama").
    2. Confirm the deletion in the modal.
- **Expected Results**:
    - The song is removed from the database.
    - The song no longer appears in the library list.

#### TC-1.1.3: Admin Login
- **User Story**: 1.1.4
- **Pre-conditions**: On the Login page.
- **Steps**:
    1. Enter valid admin credentials.
    2. Click "Sign In".
- **Expected Results**:
    - Redirected to the Home page.
    - Admin controls (Upload, Delete) are visible.

#### TC-1.1.4: Guest tries to add song
- **User Story**: 1.1.5
- **Pre-conditions**: Unauthenticated (Guest).
- **Steps**:
    1. Click the "Add Song" icon in the header.
- **Expected Results**:
    - A prompt appears: "Please join our circle to share medicine."
    - Links to Login/Signup are visible.

### 1.2 Public Library & Discovery

#### TC-1.2.1: Guest views song library
- **User Story**: 1.2.1
- **Pre-conditions**: Unauthenticated guest visits the site.
- **Steps**:
    1. Navigate to the Home page.
- **Expected Results**:
    - List of songs is visible.
    - Each song card shows Title and Author.
    - Infinite scroll/pagination works as expected.
    - Dashboard options "Add Song", "Browse", "Settings" are visible (if on Home).

#### TC-1.2.2: Search for a song
- **User Story**: 1.2.2
- **Pre-conditions**: Songs "Espíritu del agua" and "Pachamama" exist.
- **Steps**:
    1. Type "Espíritu" into the search bar.
- **Expected Results**:
    - "Espíritu del agua" is displayed.
    - "Pachamama" is hidden.

### 1.3 Basic Song Viewer

#### TC-1.3.1: Render ChordPro chords
- **User Story**: 1.3.1
- **Pre-conditions**: View "Agüita" with content `[Bm]Agüitay, [A]agüita`.
- **Steps**:
    1. Open the Song Detail page for "Agüita".
- **Expected Results**:
    - The chord "Bm" is rendered above the word "Agüitay".
    - The chord "A" is rendered above the word "agüita".

#### TC-1.3.2: Audio reference playback
- **User Story**: 1.3.2
- **Pre-conditions**: Song has a valid `audio_url`.
- **Steps**:
    1. Open the Song Detail page.
- **Expected Results**:
    - Embedded audio player (SoundCloud/Spotify) is visible and playable.

#### TC-1.3.3: Navigate back to Home (Back Arrow)
- **User Story**: 1.3.3
- **Pre-conditions**: On the Song Detail page.
- **Steps**:
    1. Click the "Back" arrow in the header.
- **Expected Results**:
    - Redirected to the Home page.

#### TC-1.3.4: Navigate Home via Logo
- **User Story**: 1.3.3
- **Pre-conditions**: On any page (e.g., /admin/upload or /songs/123).
- **Steps**:
    1. Click the "Sacred Fire Songs" logo or the text title in the header.
- **Expected Results**:
    - Redirected to the Home page (`/`).

#### TC-1.3.5: YouTube Video
- **User Story**: 1.3.3 (New)
- **Pre-conditions**: Song has `youtube_url`.
- **Steps**:
    1. View Song Detail.
- **Expected Results**:
    - Embedded YouTube player is visible.

## Phase 2: MLP - Music Tools & rich Editing

### 2.1 Music Tools

#### TC-2.1.1: Transpose chords
- **User Story**: 2.1.1
- **Steps**:
    1. Open Song Detail.
    2. Click "Transpose +1".
- **Expected Results**:
    - Chords shift up by one semitone (e.g., Bm -> Cm).

#### TC-2.1.2: Render Sheet Music (ABC Notation)
- **User Story**: 2.1.2
- **Pre-conditions**: Song has ABC notation data.
- **Steps**:
    1. View Song Detail.
- **Expected Results**:
    - A musical staff is rendered.

#### TC-2.1.3: Play melody synthesizer
- **User Story**: 2.1.3
- **Steps**:
    1. Click "Play Melody".
- **Expected Results**:
    - Synthesized audio plays.
    - Visual cursor follows the notes.

### 2.2 Rich Editing

#### TC-2.2.1: Member edits their own song
- **User Story**: 2.2.1
- **Pre-conditions**: Member is logged in and is the owner of the song.
- **Steps**:
    1. Click "Edit" on a song.
    2. Modify lyrics/chords in the text area.
    3. Save.
- **Expected Results**:
    - Changes saved to database and reflected in viewer.

#### TC-2.2.2: Non-owner cannot edit
- **User Story**: 2.2.1
- **Pre-conditions**: Member is logged in but is NOT the owner of the song.
- **Steps**:
    1. View a song owned by another user.
- **Expected Results**:
    - The "Edit Song" button is NOT visible.
    - Direct access to `/songs/[id]/edit` shows an error or redirects.

#### TC-2.2.3: Admin can edit any song
- **User Story**: 2.2.1
- **Pre-conditions**: User is logged in as Admin.
- **Steps**:
    1. View a song owned by a Member.
    2. Click "Edit Song".
- **Expected Results**:
    - Edit form opens.
    - Changes can be saved successfully.

### 2.3 Taxonomy

#### TC-2.3.1: Filter by Category
- **User Story**: 2.3.1
- **Steps**:
    1. Select "Water" from filter menu.
- **Expected Results**:
    - Only "Water" themed songs are shown.

#### TC-2.3.2: Open Filter Menu (Hamburger)
- **User Story**: 2.3.2
- **Pre-conditions**: On Song List page.
- **Steps**:
    1. Click hamburger menu.
- **Expected Results**:
    - Side drawer opens with filter options.

### 2.4 Desktop Experience

#### TC-4.4.1: Desktop Layout
- **User Story**: 4.4.1
- **Pre-conditions**: Viewport width > 1024px.
- **Steps**:
    1. View Song List.
- **Expected Results**:
    - Grid layout or multi-column view.
    - Permanent sidebar navigation.

## Phase 3: Community & Evolution
