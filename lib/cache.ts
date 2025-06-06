import redis from "./redis";

const CACHE_TTL = 60 * 60; // 1 hour in seconds

export async function getCachedData<T>(key: string): Promise<T | null> {
  const cachedData = await redis.get(key);
  if (cachedData) {
    return JSON.parse(cachedData) as T;
  }
  return null;
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
  await redis.set(key, JSON.stringify(data), "EX", CACHE_TTL);
}

export async function invalidateCache(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

// Cache keys
export const CACHE_KEYS = {
  artwork: (id: string) => `artwork:${id}`,
  artworks: (page: number, limit: number, filters: string) => 
    `artworks:${page}:${limit}:${filters}`,
  userGalleries: (userId: string) => `galleries:${userId}`,
  userCollections: (userId: string) => `collections:${userId}`,
}; 