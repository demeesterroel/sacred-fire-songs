/**
 * Detects the current Vercel or local environment and returns a identifying suffix.
 * Returns "(Preview)" for Vercel preview branches, "(Local)" for local development,
 * and an empty string for production.
 */
export function getEnvironmentSuffix(): string {
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
  const isLocal = process.env.NODE_ENV === "development";

  if (isPreview) return " (Preview)";
  if (isLocal) return " (Local)";
  return "";
}

/**
 * Returns the full site title with the environment suffix appended.
 */
export function getSiteTitle(baseTitle: string = "🔥Sacred Fire Songs"): string {
  return `${baseTitle}${getEnvironmentSuffix()}`;
}
