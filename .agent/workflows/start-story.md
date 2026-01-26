---
description: Start working on a new user story: Branch, UX check, and Plan.
---

1.  **Branch Creation**:
    -   Ask the user for the Story ID (e.g., "1.1.4") if not provided.
    -   Create a new branch named `feat/userstory-<id>` (e.g., `feat/userstory-1.1.4`) from `main`.
    -   *Crucial*: Ensure you are NOT on `main` before starting work.

2.  **Story Analysis**:
    -   Read `doc/logbook/epic&user stories.md` to find the specific user story and its acceptance criteria.
    -   (Optional) Check GitHub Issues if the story is tracked there.

3.  **UX/UI Evaluation**:
    -   Check `doc/screens/` for relevant HTML mockups.
    -   Compare the story requirements with the visual mockups.
    -   **Action Required**:
        -   If **No Mockup** exists or it is **Outdated**:
            -   Create or update the HTML mockup in `doc/screens/`.
            -   Use `generate_image` if helpful, or edit the HTML directly.
            -   **Present** the mockup to the user for validation.
        -   If **Mockup is Ready**: Confirm this with the user.

4.  **Implementation Planning**:
    -   **Draft** a new section in `implementation_plan.md` (in the Brain).
    -   Include:
        -   **Goal**: Summary of the story.
        -   **User Review Required**: Any ambiguous points.
        -   **Proposed Changes**: Files to touch (Frontend, Backend, DB).
        -   **Verification Plan**: Manual steps and automated tests.
    -   **Stop**: Do NOT start coding the implementation yet. Wait for user approval of the plan.
