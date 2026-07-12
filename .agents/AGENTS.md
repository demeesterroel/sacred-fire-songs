# Verification Rule

- **Preview Deployment Verification**: Always ask the user to verify the finished development on the Vercel Preview website before merging any branch to `main`. Do not merge automatically without explicit user confirmation of verification.

# Database Environment Rule

- **Database Separation**:
  - **Development (DEV)**: Use the locally installed Supabase stack for local development.
  - **Testing (TEST/E2E)**: Use the remote `bluette` database via Tailscale (as configured in `.env.test`).
  - **Vercel Preview**: Auto-deployed per branch/PR — uses the **staging** Supabase project (`wuigxbpwkpjqqiystbyz`).
  - **Beta (`songbook-beta.bluette.be`)**: Hetzner VPS Docker build, pinned to a commit SHA — uses **staging** Supabase.
  - **Production (Vercel `main`)**: Uses the **production** Supabase project. Never point preview/test environments at prod.
