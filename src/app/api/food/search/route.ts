import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  try {
    const db = await getDb();

    if (!query) {
      // Return all foods if no query
      const foods = await db.all('SELECT * FROM foods LIMIT 50');
      return NextResponse.json(foods);
    }

    const foods = await db.all(
      'SELECT * FROM foods WHERE name LIKE ? LIMIT 50',
      [`%${query}%`]
    );

    return NextResponse.json(foods);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch food data' }, { status: 500 });
  }
}
