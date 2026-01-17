---
description: Sync "Brain" artifacts to /doc folder. Appends new walkthrough entries to master logbook.
---

1. Read the following artifacts from the Brain directory:
    - `task.md` (Source)
    - `walkthrough.md` (Source - Represents CURRENT SESSION)
    - `time_tracking_report.md` (Source)


2. **Tasks & Time Tracking**: **APPEND** to `/doc/logbook`. Do NOT overwrite.
    - Read `doc/logbook/master-tasks.md` and append `task.md`.
    - Read `doc/logbook/master-timetracking.md` and append `time_tracking_report.md`.

3. **Master Walkthrough**: This acts as a cumulative logbook.
    - Read the current `doc/logbook/master-walkthrough.md`.
    - **APPEND** the content of `walkthrough.md` to the end of `master-walkthrough.md`.
    - Add a header with the current date/session ID to separate entries.
    - *Note:* Do not overwrite the existing history in `master-walkthrough.md`.

4. Ensure that `.agent/rules/artifact-sync-policy.md` documents this behavior.

5. (Optional) Run `git status` to verify changes.