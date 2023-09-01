export async function fetchHourlyWeather() {
  const res = await fetch(
    `${process.env.WEEK_BASE_URL}?location=seoul&timesteps=1h&apikey=${process.env.TOMORROW_API_KEY}`,
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
