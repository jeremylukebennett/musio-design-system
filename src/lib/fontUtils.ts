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

/**
 * Loads a font from Google Fonts by dynamically adding a link tag
 * Returns a promise that resolves when the font is loaded or rejects if it fails
 *
 * @param fontFamily - The font family name to load from Google Fonts
 * @returns Promise that resolves to true if loaded, false if failed
 */
export async function loadGoogleFont(fontFamily: string): Promise<boolean> {
  if (!fontFamily || fontFamily === 'Inter') {
    return true; // Default font, no need to load
  }

  // Check if already loaded
  if (isFontAvailable(fontFamily)) {
    return true;
  }

  // Convert font family to Google Fonts URL format
  // e.g., "Roboto Mono" -> "Roboto+Mono"
  const googleFontName = fontFamily.replace(/\s+/g, '+');
  const fontUrl = `https://fonts.googleapis.com/css2?family=${googleFontName}:wght@400;500;600;700&display=swap`;

  // Check if this font is already being loaded
  const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
  if (existingLink) {
    // Wait a bit and check if it's available
    await new Promise(resolve => setTimeout(resolve, 500));
    return isFontAvailable(fontFamily);
  }

  // Create and add the link tag
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl;

  return new Promise((resolve) => {
    link.onload = async () => {
      // Wait a moment for the font to be fully loaded
      await new Promise(r => setTimeout(r, 300));
      const isAvailable = isFontAvailable(fontFamily);
      resolve(isAvailable);
    };

    link.onerror = () => {
      resolve(false); // Font not found on Google Fonts
    };

    document.head.appendChild(link);

    // Timeout after 5 seconds
    setTimeout(() => {
      resolve(isFontAvailable(fontFamily));
    }, 5000);
  });
}

/**
 * Font loading state type
 */
export type FontLoadingState = 'available' | 'loading' | 'unavailable';

/**
 * Checks font availability and attempts to load from Google Fonts if needed
 * Returns the current state of the font
 *
 * @param fontFamily - The font family name to check/load
 * @returns Promise that resolves to the font state
 */
export async function checkAndLoadFont(fontFamily: string): Promise<FontLoadingState> {
  if (!fontFamily || fontFamily === 'Inter') {
    return 'available';
  }

  // Check if already available locally
  if (isFontAvailable(fontFamily)) {
    return 'available';
  }

  // Try loading from Google Fonts
  const loaded = await loadGoogleFont(fontFamily);
  return loaded ? 'available' : 'unavailable';
}
