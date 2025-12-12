/**
 * Normalizes font family input to handle various user formatting styles
 *
 * Examples:
 *   "Roboto Mono" → "Roboto Mono"
 *   "'Roboto Mono'" → "Roboto Mono"
 *   "Roboto-Mono" → "Roboto Mono"
 *   "roboto_mono" → "Roboto Mono"
 *   "ROBOTO MONO" → "Roboto Mono"
 *
 * @param input - The font family string to normalize
 * @returns Normalized font family name, or "Inter" if input is empty
 */
export function normalizeFontFamily(input: string): string {
  if (!input || !input.trim()) {
    return "Inter"; // Default fallback
  }

  let normalized = input.trim();

  // Remove surrounding quotes (single or double)
  normalized = normalized.replace(/^["'](.+)["']$/, '$1');

  // Replace dashes and underscores with spaces
  normalized = normalized.replace(/[-_]/g, ' ');

  // Capitalize each word for consistency
  normalized = normalized
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return normalized;
}
