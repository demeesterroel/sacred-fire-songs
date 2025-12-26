# Test Cases: Camino Rojo

**Version:** 1.0
**Status:** Draft
**Date:** December 25, 2025

## Changelog

| Version | Date | Description of Changes |
| ----- | ----- | ----- |
| **1.0** | Dec 25, 2025 | Initial Document Creation. Derived test cases from Epics/Stories. |


This document contains the test cases derived from the project's Epics and User Stories. These cases are intended for both manual verification and as a blueprint for future automated testing.

## Phase 1: MVP - Core Management & Public Library

### 1.1 Song Management (Admin)

#### TC-1.1.1: Admin uploads valid ChordPro file
- **User Story**: 1.1.1
- **Pre-conditions**: Admin is logged in, "Upload Song" page is open.
- **Steps**:
    1. Select a valid `.cho` file (e.g., `grandmother_earth.cho`).
    2. Click "Upload".
- **Expected Results**:
    - "Upload Successful" message appears.
    - New song entry is created in the database.
    - Song title "Grandmother Earth" is visible in the library.

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
- **User Story**: 1.1.3
- **Pre-conditions**: On the Login page.
- **Steps**:
    1. Enter valid admin credentials.
    2. Click "Sign In".
- **Expected Results**:
    - Redirected to the Home page.
    - Admin controls (Upload, Delete) are visible.

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

#### TC-1.2.2: Search for a song
- **User Story**: 1.2.2
- **Pre-conditions**: Songs "Water Spirit" and "Grandmother Earth" exist.
- **Steps**:
    1. Type "Water" into the search bar.
- **Expected Results**:
    - "Water Spirit" is displayed.
    - "Grandmother Earth" is hidden.

### 1.3 Basic Song Viewer

#### TC-1.3.1: Render ChordPro chords
- **User Story**: 1.3.1
- **Pre-conditions**: View a song with ChordPro formatting (e.g., `[Am]Grandmother`).
- **Steps**:
    1. Open the Song Detail page.
- **Expected Results**:
    - The chord "Am" is rendered above the word "Grandmother".

#### TC-1.3.2: Audio reference playback
- **User Story**: 1.3.2
- **Pre-conditions**: Song has a valid `audio_url`.
- **Steps**:
    1. Open the Song Detail page.
- **Expected Results**:
    - Embedded audio player (SoundCloud/Spotify) is visible and playable.

## Phase 2: MLP - Music Tools & rich Editing

### 2.1 Music Tools

#### TC-2.1.1: Transpose chords
- **User Story**: 2.1.1
- **Steps**:
    1. Open Song Detail.
    2. Click "Transpose +1".
- **Expected Results**:
    - Chords shift up by one semitone (e.g., Am -> Bbm).

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

#### TC-2.2.1: Manual Edit Song
- **User Story**: 2.2.1
- **Steps**:
    1. Click "Edit" on a song.
    2. Modify lyrics/chords in the text area.
    3. Save.
- **Expected Results**:
    - Changes saved to database and reflected in viewer.

### 2.3 Taxonomy

#### TC-2.3.1: Filter by Category
- **User Story**: 2.3.1
- **Steps**:
    1. Select "Water" from filter menu.
- **Expected Results**:
    - Only "Water" themed songs are shown.
