---
description: Update the version, date, and changelog of a documentation file.
---

# Update Documentation Changelog

Use this workflow when you have modified a file in `doc/` and need to update its metadata.

## 1. Parse File Type
Identify if the file is Markdown (`.md`), SQL (`.sql`), or HTML (`.html`).

## 2. Prepare Metadata
*   **Target File**: `{{ target_file }}`
*   **Description of Changes**: `{{ description }}`
*   **New Date**: Get current date (e.g., "Jan 10, 2026").
*   **New Version**: Read the current version from the file header (e.g., `**Version:** 1.2`) and increment the minor version (e.g., to `1.3`).

## 3. Apply Updates

### For Markdown Files (`.md`)
1.  **Update Header**:
    *   Find the line starting with `**Version:**` and update the number.
    *   Find the line starting with `**Date:**` and update the date.
2.  **Update Changelog Table**:
    *   Locate the "Changelog" table.
    *   Append a new row to the table: `| **{{ new_version }}** | {{ new_date }} | {{ description }} |`

### For SQL Files (`.sql`)
1.  **Update Header Comments**:
    *   Find `**Version:**` in the top comment block and update.
    *   Find `**Date:**` and update.
2.  **Update Usage/Changelog**:
    *   If a changelog exists in comments, append `{{ new_version }} - {{ new_date }}: {{ description }}`.
    *   If no explicit changelog, ensure the top comment description mentions the latest update.

### For HTML Files (`.html`)
1.  **Update Comment Header**:
    *   Look for `<!-- Version: X.Y -->` or similar. Update it.
    *   Look for `<!-- Date: ... -->`. Update it.
    *   Add a comment line for the change.

## 4. Verification
*   Verify that the file header now shows the new version and date.
*   Verify that the changelog includes the new entry.
