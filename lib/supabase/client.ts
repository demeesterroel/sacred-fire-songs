import { createBrowserClient } from "@supabase/ssr";

let supabase: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Singleton client for the browser to avoid multiple initializations
 */
export function createClient() {
    if (typeof window === 'undefined') {
        return createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        );
    }

    if (supabase) return supabase;

    console.log("[Supabase Client] Creating new browser instance");
    supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
    return supabase;
}