export async function fetchTodayWeather(lat?: string, lng?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REALTIME_BASE_URL}?location=${lat}, ${lng}&units=metric&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`,
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
  return data;
}