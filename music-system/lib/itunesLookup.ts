"use client";

interface ItunesTrack {
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
}

interface ItunesResponse {
  resultCount?: number;
  results?: ItunesTrack[];
}

const cache = new Map<string, string | null>();
const inflight = new Map<string, Promise<string | null>>();

function buildSearchUrl(term: string) {
  return `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}&entity=song&limit=5&media=music`;
}

function pickBest(
  data: ItunesResponse | null,
  title: string,
  artist: string
): string | null {
  if (!data?.results?.length) return null;
  const t = title.toLowerCase();
  const a = artist.toLowerCase();
  const scored = data.results
    .filter((r) => r.previewUrl)
    .map((r) => {
      const tn = (r.trackName ?? "").toLowerCase();
      const an = (r.artistName ?? "").toLowerCase();
      let score = 0;
      if (tn === t) score += 4;
      else if (tn.includes(t) || t.includes(tn)) score += 2;
      if (an === a) score += 4;
      else if (an.includes(a) || a.includes(an)) score += 2;
      return { url: r.previewUrl!, score };
    })
    .sort((x, y) => y.score - x.score);
  return scored[0]?.url ?? data.results.find((r) => r.previewUrl)?.previewUrl ?? null;
}

async function fetchJson(url: string): Promise<ItunesResponse | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as ItunesResponse;
  } catch {
    return null;
  }
}

export async function lookupPreview(
  title: string,
  artist: string
): Promise<string | null> {
  const key = `${title}::${artist}`.toLowerCase();
  if (cache.has(key)) return cache.get(key) ?? null;
  const existing = inflight.get(key);
  if (existing) return existing;

  const promise: Promise<string | null> = (async () => {
    const tries = [
      `${title} ${artist}`,
      title,
      `${title} ${artist.split(/[,&]/)[0].trim()}`,
    ];
    for (const term of tries) {
      const data = await fetchJson(buildSearchUrl(term));
      const url = pickBest(data, title, artist);
      if (url) {
        cache.set(key, url);
        return url;
      }
    }
    cache.set(key, null);
    return null;
  })();

  inflight.set(key, promise);
  promise.finally(() => inflight.delete(key));
  return promise;
}
