-- Migration: Fix missing Composition Index
-- Date: 2026-01-30
-- Description: Explicitly adds the index on compositions(owner_id) which might have been skipped in the previous run.
CREATE INDEX IF NOT EXISTS idx_compositions_owner_id ON public.compositions(owner_id);