import pg from "pg";
const { Pool } = pg;

const globalWithPg = global as typeof globalThis & {
  _pgPool?: pg.Pool;
  _pgConnectionString?: string;
};

const connStr = process.env.DATABASE_URL;

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
    idleTimeoutMillis: 300000,
    connectionTimeoutMillis: 10000,
    keepAlive: true,
  });

  globalWithPg._pgPool = newPool;
  globalWithPg._pgConnectionString = connStr;
}

const pool = globalWithPg._pgPool!;
export default pool;

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export function invalidateCache() {
  // No-op kept for backwards compatibility
}
