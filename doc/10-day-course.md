# 10-Day Modern Web Development Curriculum: The Camino Rojo Project

**Student Profile:** Physics/IT Master, Exp. Software Engineering Teacher.
**Goal:** Build a PWA (Next.js/Supabase) while updating programming skills.

## Phase 1: The Paradigm Shift (Language & Framework)

### Day 1: TypeScript - The Bridge from Java/.NET

**Concept:** JavaScript is loosely typed (chaos). TypeScript brings back the strict typing, interfaces, and compile-time checks you are used to in Java.

* **Theory:**

  * `var` is dead. Use `const` (immutable reference) and `let`.

  * **Interfaces:** Similar to Java Interfaces but for data shapes (JSON), not just class contracts.

  * **Generics:** You know `<T>` from Java/C#. It works the same here.

* **Action:**

  * Initialize the Next.js project using the terminal (you know Linux, so use `npx create-next-app`).

  * **Task:** Create a `types.ts` file. Define the interfaces for `Song`, `Composition`, and `User` based on the **Design Document Section 5.2**.

  * *Example:* `interface Song { id: string; title: string; key: string; ... }`

### Day 2: React & Next.js - Components vs. Classes

**Concept:** In old OOP, you built Class Hierarchies. In React, you build **Component Trees**. A Component is just a function that returns HTML (JSX).

* **Theory:**

  * **JSX:** It looks like HTML mixed with JS.

  * **Props:** These are just function arguments passed from a Parent to a Child component.

  * **Server vs. Client Components:** Next.js renders code on the server (like PHP/JSP used to) but "hydrates" it on the client.

* **Action:**

  * Analyze the generated `screen_1_home.html` code.

  * **Task:** Break Screen 1 into React Components: `Header.tsx`, `SearchBar.tsx`, `SongCard.tsx`.

  * Pass data (Props) into `SongCard` (e.g., `<SongCard title="Grandmother Earth" key="Am" />`).

## Phase 2: The UI & Styling (Visuals)

### Day 3: Tailwind CSS - Utility First

**Concept:** Forget writing separate `.css` files with cascading inheritance hell. Tailwind applies styles directly in HTML classes. It feels like "inline styles" but with a design system constraints.

* **Theory:**

  * Flexbox & Grid: The physics of layout. `flex-row`, `items-center`, `justify-between`.

  * Dark Mode: `dark:bg-gray-900`.

* **Action:**

  * **Task:** Implement the visual layout of **Screen 1** using Tailwind.

  * Use your Linux skills to run the dev server (`npm run dev`) and see changes live (Hot Reloading).

  * *Challenge:* Make the search bar "Sticky" using `sticky top-0`.

### Day 4: State Management - Hooks

**Concept:** In desktop apps, you modify variables directly. In React, variables are immutable. You use "Hooks" (`useState`) to request a re-render.

* **Theory:**

  * `useState`: "Preserve this variable between renders."

  * `useEffect`: "Run this code when the component mounts" (like a Constructor + Destructor combined).

* **Action:**

  * **Task:** Make the Search Bar on Screen 1 functional (locally).

  * Create a list of mock songs. Filter that list based on what you type in the input.

  * *Key Learning:* Input `onChange` events.

## Phase 3: The Backend & Data (Database)

### Day 5: Supabase - Postgres for the Web

**Concept:** You taught databases, so SQL is second nature. Supabase is just PostgreSQL wrapped in a REST/Websocket API.

* **Theory:**

  * RLS (Row Level Security): Security logic lives in the Database, not just the App Code.

* **Action:**

  * Go to Supabase.com, create the project.

  * **Task:** Open the SQL Editor in Supabase. Paste and run the `supabase_schema.sql` provided in our previous chat.

  * Insert 3 dummy rows into the `compositions` and `song_versions` tables using SQL `INSERT` statements.

### Day 6: Connecting Backend to Frontend

**Concept:** Async/Await. JavaScript is single-threaded. We don't block the thread while waiting for the DB; we await the Promise.

* **Theory:**

  * `async/await`: Syntax sugar for Promises (callbacks).

  * Supabase JS Client: `await supabase.from('songs').select('*')`.

* **Action:**

  * **Task:** In Next.js, fetch the list of songs from Supabase and display them on Screen 1.

  * Replace your Day 4 "Mock Data" with real DB data.

## Phase 4: The Application Logic (Algorithms)

### Day 7: The "Physics" Part - Algorithms & Parsing

**Concept:** Pure Logic. This is where your classic programming brain will shine. No UI, just data manipulation.

* **Theory:**

  * Regex: Parsing the text files.

  * Modulo Arithmetic: The circular array logic for music keys.

* **Action:**

  * **Task A (Parsing):** Write a TypeScript function that takes a raw string `[Am]Hello` and splits it into an array of objects: `[{chord: 'Am', text: 'Hello'}]`.

  * **Task B (Transposition):** Implement the Algorithm from **Design Doc Section 8.2**. Use a circular array of notes. Create a function `transpose(note, semitones)`.

## Phase 5: Modern Web Capabilities

### Day 8: React Query & Caching (The PWA Part)

**Concept:** Stale-While-Revalidate. Don't fetch data every time. Fetch it, cache it, show the cache, update in background. Crucial for offline apps.

* **Theory:**

  * TanStack Query: The standard library for async state.

  * `localStorage`: The browser's tiny SQL-lite/Key-Value store.

* **Action:**

  * **Task:** Wrap your Supabase fetch (Day 6) in a `useQuery` hook.

  * Turn off your WiFi. See if the app still shows the songs (simulating the forest ceremony environment).

### Day 9: Deployment & CI/CD

**Concept:** "It works on my machine" is solved by containers and serverless functions. Vercel handles the DevOps.

* **Theory:**

  * Git: You likely know this.

  * CI/CD: Automated build pipeline.

* **Action:**

  * Push your code to GitHub.

  * Connect GitHub to Vercel.

  * **Task:** Deploy the live URL. Open it on your actual mobile phone. Add it to your Home Screen (PWA install).

## Phase 6: The Modern Developer Workflow

### Day 10: AI-Assisted Debugging & Review

**Concept:** You are the pilot; AI is the co-pilot. Learning to prompt for code is a skill you already taught for Linux, now apply it to code generation.

* **Action:**

  * **Task:** Use Cursor/AI to refactor a messy component.

  * **Task:** Intentionally break your SQL query. Use the Browser DevTools (Network Tab) to find the error.

  * **Retrospective:** Review the roadmap. Plan Phase 2 (Melody/ABC notation).

## Recommended Tools for You

1. **Cursor (IDE):** It allows you to query your codebase. "Where is the logic for transposition?" -> It takes you there.

2. **Chrome DevTools:** Press F12. The "Console" is your stdout. The "Network" tab is your traffic monitor.

3. **TypeScript Playground:** A website to test pure logic without React overhead.
