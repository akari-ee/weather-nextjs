import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const city = url.searchParams.get('city');

  const res = await fetch(
    `${process.env._REALTIME_BASE_URL}?location=${city}&units=metric&apikey=${process.env._TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error('API Error');
  }

  const data = await res.json();

  return NextResponse.json({ data });
}
