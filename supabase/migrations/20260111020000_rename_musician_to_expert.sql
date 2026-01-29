-- Migration: Rename 'musician' role to 'expert'
-- Date: 2026-01-11

-- 1. Add 'expert' to the enum (Postgres doesn't support renaming enum values directly easily)
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'expert' AFTER 'admin';

-- NOTE: We cannot easily remove 'musician' from the enum without dropping/recreating the type.
-- Data migration is handled in 20260111020001_migrate_musician_data.sql
