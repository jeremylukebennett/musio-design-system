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

/**
 * Checks if a font family is available on the system
 * Uses canvas text measurement to detect if the browser can render the font
 *
 * @param fontFamily - The font family name to check
 * @returns true if the font is available, false otherwise
 */
export function isFontAvailable(fontFamily: string): boolean {
  if (!fontFamily || fontFamily === 'Inter') {
    return true; // Default font is always available
  }

  // Create a canvas to measure text width
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return true; // Can't check, assume it's available
  }

  // Test string with various character widths
  const testString = 'mmmmmmmmmmlli';
  const fontSize = '72px';

  // Measure with a baseline monospace font
  context.font = `${fontSize} monospace`;
  const baselineWidth = context.measureText(testString).width;

  // Measure with the test font, falling back to monospace
  context.font = `${fontSize} "${fontFamily}", monospace`;
  const testWidth = context.measureText(testString).width;

  // If widths are different, the font is available
  // (the fallback monospace wasn't used)
  return testWidth !== baselineWidth;
}
