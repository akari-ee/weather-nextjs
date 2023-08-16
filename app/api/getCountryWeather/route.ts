import { NextRequest } from "next/server"
export async function POST(request: NextRequest) {
  const { lat, lon } = request.body;

  const res = await fetch(`${process.env.NEXT_PUBLIC_REALTIME_BASE_URL}?location=${lat}, ${lon}&units=metric&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`,
  {
    method: 'GET',
    headers: { accept: 'application/json' },
    next: { revalidate: 3600 },
  })
  const data = await res.json()
  return data;
}
