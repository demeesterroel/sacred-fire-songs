---
trigger: glob
description: Ensure database schema documentation is kept in sync with migrations.
globs: supabase/migrations/*.sql
---

# Update Schema Documentation

Whenever you create, modify, or delete a migration file in `supabase/migrations/`:

1.  You MUST also update `doc/db-schema.sql` to reflect the changes.
2.  You SHOULD use the `.agent/workflows/update-schema.md` workflow to perform this update if helpful.
3.  Ensure `doc/db-schema.sql` remains a valid, single-file setup script for fresh installs.