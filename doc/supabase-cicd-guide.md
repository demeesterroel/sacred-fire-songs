# Managing Supabase Schema Changes in CI/CD

To ensure your production database schema is always in sync with your application code without data loss, you should treat your **Database Schema as Code**.

The standard industry approach with Supabase and Next.js (deployed on Vercel) involves using the **Supabase CLI** for local development and **GitHub Actions** for deploying schema changes.

## The Workflow

1.  **Local Development:** Make schema changes locally (using CLI or dashboard synced to local).
2.  **Generate Migration:** Create a SQL migration file that tracks the precise changes.
3.  **Version Control:** Commit the migration file along with your application code.
4.  **Automated Deployment:**
    *   **Database:** A GitHub Action detects the new migration file and runs `supabase db push` to apply it to your Production Supabase project.
    *   **Application:** Vercel detects the commit and deploys the new Next.js app.

## Step-by-Step Implementation

### 1. Install & Initialize Supabase CLI
If you haven't already, utilize the Supabase CLI to manage your project locally.

```bash
npm install supabase --save-dev
npx supabase init
```

### 2. Developing Schema Changes
When you need to modify your database (e.g., adding `youtube_url`):

**Option A: Manual SQL (Recommended for precision)**
Create a new migration file:
```bash
npx supabase migration new add_youtube_url_to_songs
```
This creates `supabase/migrations/<timestamp>_add_youtube_url_to_songs.sql`. Paste your valid SQL there.

**Option B: Diffing (If you use the local dashboard)**
If you make changes in the local Studio UI (`npx supabase start` -> `http://localhost:54323`), you can auto-generate the SQL:
```bash
npx supabase db diff -f add_youtube_url_to_songs
```

### 3. Setting up CI/CD (GitHub Actions)

Create a workflow file `.github/workflows/deploy-db.yml` to automatically apply migrations when you push to `main`.

**Prerequisites:**
- Configure the required secrets in GitHub (see **Managing Secrets** section below).

**Workflow File (`.github/workflows/deploy-db.yml`):**

```yaml
name: Deploy Database Schema

on:
  push:
    branches:
      - main
    paths:
      - 'supabase/migrations/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Push migrations to Supabase
        run: supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
          SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}
```

### 4. Managing Secrets
For the GitHub Action to work, you must add these three secrets to your Repository Settings:

**1. SUPABASE_ACCESS_TOKEN**
*   **What it is:** A personal access token that gives GitHub permission to manage your Supabase account.
*   **How to find it:**
    1.  Go to [Supabase Dashboard > Access Tokens](https://supabase.com/dashboard/account/tokens).
    2.  Click **"Generate New Token"**.
    3.  Name it "GitHub CI/CD" and copy it immediately.

**2. SUPABASE_PROJECT_ID**
*   **What it is:** The unique ID of your Supabase project.
*   **How to find it:**
    *   Look at your `.env.local` file `NEXT_PUBLIC_SUPABASE_URL`.
    *   It is the string at the beginning: `https://<PROJECT_ID>.supabase.co`.
    *   Example: `eiyhjlgmdguzzcvrckvs`.

**3. SUPABASE_DB_PASSWORD**
*   **What it is:** The password for your Postgres database (not your user login).
*   **How to find it:**
    *   You cannot view it after creation.
    *   If you lost it, go to **Supabase Dashboard > Settings (Gear Icon) > Database**.
    *   Scroll to "Database Password" and click **"Reset database password"**. The app will stay online (it uses the API key), but you must update any direct DB connections.

**How to Add to GitHub:**
1.  Go to **GitHub Repo > Settings > Secrets and variables > Actions**.
2.  Click **"New repository secret"**.
3.  Add all three secrets individually.

## handling Breaking Changes
To avoid downtime or errors during the window where the DB is updated but the App isn't (or vice versa):

1.  **Additive Changes (Safe):** adding a column (like `youtube_url`) is safe. Old code ignores it, new code uses it.
2.  **Destructive Changes (Dangerous):** Renaming or dropping columns requires a **multi-step process**:
    *   **Step 1:** Add the new column, copy data, keep the old column. Deploy Code that reads new column but writes to both (if needed).
    *   **Step 2:** Deploy Code that uses *only* the new column.
    *   **Step 3:** Drop the old column in a future deployment.

## Summary
By checking your SQL migrations into git (`supabase/migrations`), you ensure that your "source of truth" is the code repository. Vercel handles the Frontend/API, and GitHub Actions handles the Database, keeping them effectively synchronized on every push to `main`.
