import { NextRequest, NextResponse } from 'next/server';
import { getRandomQuote, getQuotesByCategory, getAllCategories } from '@/lib/database';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const action = searchParams.get('action');

  try {
    if (action === 'categories') {
      const categories = await getAllCategories();
      return NextResponse.json({ categories });
    }

    if (category) {
      const quotes = await getQuotesByCategory(category);
      if (quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return NextResponse.json({ quote: randomQuote });
      }
    }

    const quote = await getRandomQuote();
    if (quote) {
      return NextResponse.json({ quote });
    }

    return NextResponse.json(
      { error: 'No quotes found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}