export type CachedLetter = { letter: string; value: number };
export type CachedResult = { total: number; letters: CachedLetter[] };
export type CachedNameResult = { name: string; result: CachedResult };

const SESSION_KEY = "gematria_nameResults";
let _cache: CachedNameResult[] = [];

export function setNamesCache(results: CachedNameResult[]): void {
  _cache = results;
  try {
    if (results.length > 0) sessionStorage.setItem(SESSION_KEY, JSON.stringify(results));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function getNamesCache(): CachedNameResult[] {
  if (_cache.length > 0) return _cache;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) { const p = JSON.parse(raw) as CachedNameResult[]; if (p.length > 0) { _cache = p; return p; } }
  } catch {}
  return [];
}
