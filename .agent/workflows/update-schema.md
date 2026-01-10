---
description: Update the consolidated database schema documentation (`doc/db-schema.sql`) to reflect the latest Supabase migrations.
---

1. **List Migrations**: List all files in the `supabase/migrations` directory to identify the current state of database changes.
   ```bash
   ls -R supabase/migrations
   ```

2. **Read Current Schema**: Read the existing `doc/db-schema.sql` file to understand the baseline documentation.
   ```bash
   cat doc/db-schema.sql
   ```

3. **Read Recent Migrations**: Read the content of any migration files that appear to be newer than the last schema update (or read all if unsure).

4. **Update Schema Documentation**:
   - intelligently merge the logic from the migration files into `doc/db-schema.sql`.
   - **Crucially**, do not just append the migration content. You must rewrite the `CREATE TABLE` / `ALTER TABLE` statements in `doc/db-schema.sql` to represent the *final* state as if the table was created that way from the start.
   - For example, if a migration adds a column, update the original `CREATE TABLE` definition in the doc to include that column.
   - Ensure the version and date in the header comment are updated.

5. **Verify**: Check that the generated SQL is syntactically correct and covers all new features introduced by the migrations.
