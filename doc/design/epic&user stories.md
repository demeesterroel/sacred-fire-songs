
### Story 1.1.7 (Member): Draft Auto-Save
*   **As a** Member
*   **I want** my new song drafts to be saved automatically to my browser's local storage
*   **So that** I don't lose my work if I navigate away.

    *   **Acceptance Criteria:**
        *   Form data (Title, Author, Lyrics, Metadata) is saved to `localStorage` on change.
        *   Returning to `/songs/add` restores the saved data.
        *   Submitting the song successfully clears the draft.
        *   Draft persistence only applies to the "Add" mode, not Edit.
