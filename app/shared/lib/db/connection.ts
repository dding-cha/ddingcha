import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: false,
})

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  // Convert params to ensure they're the right type
  const normalizedParams = params?.map(p => {
    if (typeof p === 'number') return p
    if (typeof p === 'string') return p
    if (typeof p === 'boolean') return p ? 1 : 0
    return p
  })

  const [rows] = await pool.query(sql, normalizedParams)
  return rows as T[]
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params)
  return rows[0] || null
}

export default pool
