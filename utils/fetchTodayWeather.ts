export async function fetchTodayWeather(lat?: string, lng?: string) {
  const res = await fetch(
    `${process.env.REALTIME_BASE_URL}?location=${lat}, ${lng}&units=metric&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      cache: 'force-cache',
    }
  );
  if (!res.ok) {
    throw new Error('API Error');
  }

  const data = await res.json();
  return data;
}