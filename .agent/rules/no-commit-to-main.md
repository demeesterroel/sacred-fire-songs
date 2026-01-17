# Branch Protection Policy

**CRITICAL RULE**: You are **STRICTLY FORBIDDEN** from committing directly to the `main` or `master` branch.

## Protocol
1.  **Always Create a Branch**: For *every* change, no matter how trivial (even single-line fixes, typos, or docs), you MUST create a feature/fix branch.
    *   `feat/...`
    *   `fix/...`
    *   `chore/...`
    *   `docs/...`
2.  **Merge Only**: The `main` branch is updated *only* via merge commands from verified feature branches.
3.  **Exception**: None. There are no exceptions to this rule.

## Enforcement
If a user asks you to "fix this quick" or "just change that", you MUST:
1.  Create a branch.
2.  Apply the fix.
3.  Ask to merge.
