import DetailWeather from '@/components/DetailWeather';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HourlyWeather from '@/components/HourlyWeather';
import TodayWeather from '@/components/TodayWeather';
import WeekWeather from '@/components/WeekWeather';
import Image from 'next/image';

// const options = { method: 'GET', headers: { accept: 'application/json' } };

export default function Home() {
  const todayWeathers = getTodayWeather();
  const hourlyWeathers = getHourlyWeather();
  const weekWeathers = getWeekWeather();
  return (
    <div className='h-screen text-black snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[dodgerblue]/50'>
      {/* Header */}
      {/* <Header /> */}
      {/* Today Weather */}
      <section id='today' className='snap-start'>
        <TodayWeather promise={todayWeathers} />
      </section>
      {/* Hourly Weather */}
      <section id='hourly' className='snap-start'>
        <HourlyWeather promise={hourlyWeathers} />
      </section>
      {/* Week Weather */}
      <section id='week' className='snap-start'>
        <WeekWeather promise={weekWeathers} />
      </section>
      {/* Detail Weather */}
      <section id='detail' className='snap-start'>
        <DetailWeather />
      </section>
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

async function getTodayWeather(lat?: string, lon?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REALTIME_BASE_URL}?location=seoul&units=metric&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );
  // .then((res) => {
  //   console.log(res);
  //   return res.json();
  // })
  // .catch((err) => console.log(err));

  if (!res.ok) {
    console.log(res);
    throw new Error('API Error');
  }

  return res.json();
}

async function getHourlyWeather(lat?: string, lon?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEEK_BASE_URL}?location=seoul&timesteps=1h&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('API Error');
  }

  return res.json();
}

async function getWeekWeather(lat?: string, lon?: string) {
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

  return res.json();
}

// https://api.tomorrow.io/v4/weather/realtime?location=seoul&units=metric&apikey=iRYZvzMGM8LKyM0OFKkYNfRfslyEcV3r
