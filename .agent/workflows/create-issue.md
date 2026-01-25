---
description: Create a standardized GitHub Issue with Gherkin Acceptance Criteria and optional Sub-Issue linking
---

This workflow guides the agent through creating a structured GitHub issue for the project.

## Prerequisites
- GitHub CLI (`gh`) installed.
- `gh-sub-issue` extension installed (for linking sub-issues).

## 1. Determine Context & Labels
- **Ask the User:** "Is this a new top-level issue or a sub-issue?"
- **If Sub-Issue:**
    - Ask for the **Parent Issue ID**.
    - Run: `gh issue view [Parent_ID] --json labels`
    - Extract any label starting with `epic-` (e.g., `epic-1.1`) from the parent.
    - Use this label for the new issue.
- **If Top-Level:**
    - Ask the user: "Which Epic does this belong to?" (or check `doc/epic&user stories.md`).
    - Use the provided label (e.g., `epic-2.0`).

## 2. Draft the Issue Content
Create a temporary markdown file (e.g., `issue_draft.md`) with the following structure:

```markdown
# [Title in Format: [Story X.X.X] Description]

**Description:**
> **Story X.X.X**
> (Optional: Sub-issue of #ParentID ([Parent Title]))
> As a [Role], I want to [Action] so that [Benefit].

**Acceptance Criteria (Gherkin):*

`​``gherkin
Scenario: [Title]
  Given [Context]
  When [Action]
  Then [Outcome]
`​``

**Labels:** `user-story`, `epic-X.X`
```

## 2. Review with User
- Present the draft to the user for approval.
- Ensure the Gherkin syntax covers the main requirements.

## 3. Create the Issue
Run the following command:
```bash
gh issue create --title "[Title]" --body-file issue_draft.md --label "label1,label2"
```

## 4. Link as Sub-Issue (Optional)
If the user specified a parent issue (e.g., Parent ID `#27`), use the `gh-sub-issue` extension:

```bash
gh sub-issue add [Parent_ID] [New_Issue_ID]
```

## 5. Clean Up
- Delete the temporary draft file after successful creation.