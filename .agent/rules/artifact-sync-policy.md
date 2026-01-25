---
trigger: always_on
---

# Artifact Synchronization Policy

## Objective
To ensure the project documentation (`/doc/logbook`) is always in sync with the agent's internal context (`brain`).

## Critical: Memory & Persistence
**The Agent DOES NOT retain memory across conversations.**
Therefore, strictly overwriting files carries a risk of data loss if the Agent hasn't loaded the full history first.

## Mappings & Strategy
| Artifact | Behavior | Strategy |
| :--- | :--- | :--- |
| `master-walkthrough.md` | **APPEND** | **Safe**. Adds to history. |
| `master-tasks.md` | **APPEND** | **Caution**. Agent **MUST READ** the existing file first to merge history with new tasks. |
| `master-timetracking.md` | **APPEND** | **Caution**. Agent **MUST READ** the existing file first to update totals. |

## Rules
1.  **Initialization**: At the start of a new project workspace or conversation, the Agent should **READ** the files in `doc/logbook/` to initialize its internal state.
2.  **Sync Trigger**: Run `/sync-artifacts` at the end of a session.
3.  **Safety Check**: Never overwrite any of the files `master-walkthrough.md`,`master-tasks.md` or  `master-timetracking.md` with an empty or partial list. ensuring previously completed items are preserved.
