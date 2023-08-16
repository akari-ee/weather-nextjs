import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEEK_BASE_URL}?location=seoul&timesteps=1d&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('API Error');
  }
  const data = res.json();
  
  return NextResponse.json(data);
}
