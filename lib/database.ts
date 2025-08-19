import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Quote {
  quote: string;
  author: string;
  category: string;
}

export async function getRandomQuote(): Promise<Quote | null> {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT "quote", author, category FROM quotes.quotes ORDER BY RANDOM() LIMIT 1'
    );
    client.release();
    
    if (result.rows.length > 0) {
      return result.rows[0] as Quote;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

export async function getQuotesByCategory(category: string): Promise<Quote[]> {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT "quote", author, category FROM quotes.quotes WHERE category = $1',
      [category]
    );
    client.release();
    
    return result.rows as Quote[];
  } catch (error) {
    console.error('Error fetching quotes by category:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT DISTINCT category FROM quotes.quotes ORDER BY category'
    );
    client.release();
    
    return result.rows.map(row => row.category);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}