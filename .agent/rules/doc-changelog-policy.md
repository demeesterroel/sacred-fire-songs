---
trigger: glob
description: Ensure documentation metadata (Version, Date, Changelog) is updated on every change.
globs: doc/*.{md,sql,html}
---

# Update Documentation Metadata

Whenever you modify a file in the `doc/` directory (Markdown, SQL, or HTML):

1.  **Update the Version**: Increment the version number at the top of the file (e.g., 1.2 -> 1.3).
2.  **Update the Date**: Set the date to the current date.
3.  **Add Changelog Entry**: Add a new row to the Changelog table (for Markdown) or a new line to the Changelog comment section (for SQL/HTML).
4.  **Use the Workflow**: You SHOULD use `.agent/workflows/update-doc-changelog.md` to perform these steps consistently if you are not doing them manually as part of the edit.