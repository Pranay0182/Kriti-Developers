import pg from "pg";
const { Pool } = pg;

type QueryResult<T extends pg.QueryResultRow = any> = pg.QueryResult<T>;

const globalWithPg = global as typeof globalThis & {
  _pgPool?: pg.Pool;
  _pgConnectionString?: string;
  _dbCache?: Map<string, { data: any; expiry: number }>;
};

if (!globalWithPg._dbCache) {
  globalWithPg._dbCache = new Map();
}
const cache = globalWithPg._dbCache;

const connStr = process.env.DATABASE_URL;

// Re-create pool if connection string changed, or if not yet initialized
if (!globalWithPg._pgPool || globalWithPg._pgConnectionString !== connStr) {
  if (globalWithPg._pgPool) {
    try {
      globalWithPg._pgPool.end();
    } catch {}
  }

  const newPool = new Pool({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
    max: 20,
    min: 4, // Keep 4 warm connections permanently open
    idleTimeoutMillis: 300000, // 5 minutes
    connectionTimeoutMillis: 10000,
    keepAlive: true,
  });

  const baseQuery = newPool.query.bind(newPool);

  // Wrap query ONCE on the fresh pool with in-memory caching for SELECT queries
  (newPool as any).query = async function (text: any, params?: any): Promise<QueryResult<any>> {
    if (typeof text === "string") {
      const trimmed = text.trim().toUpperCase();
      if (trimmed.startsWith("SELECT")) {
        const key = `${text}::${JSON.stringify(params || [])}`;
        const now = Date.now();
        const cached = cache.get(key);
        if (cached && cached.expiry > now) {
          return cached.data;
        }
        const res = await baseQuery(text, params);
        cache.set(key, { data: res, expiry: now + 300000 }); // 5 min cache
        return res;
      } else {
        // Any mutation clears cache
        cache.clear();
      }
    }
    return baseQuery(text, params);
  };

  globalWithPg._pgPool = newPool;
  globalWithPg._pgConnectionString = connStr;
  cache.clear();
}

const pool = globalWithPg._pgPool!;
export default pool;

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export function invalidateCache() {
  cache.clear();
}
