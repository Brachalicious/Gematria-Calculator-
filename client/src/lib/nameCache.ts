/**
 * nameCache.ts
 * Module-level cache for the active name results from the Gematria Calculator.
 * Using a module-level variable means ANY component can read the latest names
 * instantly — no props, no effects, no timing issues.
 */

export type CachedLetter = { letter: string; value: number };
export type CachedResult = { total: number; letters: CachedLetter[] };
export type CachedNameResult = { name: string; result: CachedResult };

const SESSION_KEY = "gematria_nameResults";

// Module-level cache — shared across all imports in the same browser session
let _cache: CachedNameResult[] = [];

/** Called by GematriaCalculator on every render whenever names change. */
export function setNamesCache(results: CachedNameResult[]): void {
  _cache = results;
  try {
    if (results.length > 0) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(results));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // sessionStorage not available — memory cache is still fine
  }
}

/** Called by ChatBot (and anything else) to get the latest names. */
export function getNamesCache(): CachedNameResult[] {
  // 1. In-memory cache (fastest, always current in the same page load)
  if (_cache.length > 0) return _cache;

  // 2. sessionStorage (survives page refreshes)
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CachedNameResult[];
      if (parsed.length > 0) {
        _cache = parsed; // warm the in-memory cache
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return [];
}
