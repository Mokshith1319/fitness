import { NextRequest, NextResponse } from 'next/server';
import { initialFoods } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  try {
    if (!query) {
      // Return all foods if no query
      return NextResponse.json(initialFoods);
    }

    const searchTerm = query.toLowerCase();
    const foods = initialFoods.filter(food =>
      food.name.toLowerCase().includes(searchTerm)
    );

    return NextResponse.json(foods);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch food data' }, { status: 500 });
  }
}
