import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return error after 10 seconds if connection could not be established
  maxUses: 7500, // Close (and replace) a connection after it has been used this many times
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Database pool has ended');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Database pool has ended');
    process.exit(0);
  });
});

export interface Quote {
  quote: string;
  author: string;
  category: string;
}

export async function getRandomQuote(): Promise<Quote | null> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.query(
      'SELECT "quote", author, category FROM quotes.quotes ORDER BY RANDOM() LIMIT 1'
    );
    
    if (result.rows.length > 0) {
      return result.rows[0] as Quote;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function getQuotesByCategory(category: string): Promise<Quote[]> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.query(
      'SELECT "quote", author, category FROM quotes.quotes WHERE category = $1',
      [category]
    );
    
    return result.rows as Quote[];
  } catch (error) {
    console.error('Error fetching quotes by category:', error);
    return [];
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function getAllCategories(): Promise<string[]> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.query(
      'SELECT DISTINCT category FROM quotes.quotes ORDER BY category'
    );
    
    return result.rows.map(row => row.category);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  } finally {
    if (client) {
      client.release();
    }
  }
}