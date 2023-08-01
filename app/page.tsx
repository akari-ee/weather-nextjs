import DetailWeather from '@/components/DetailWeather';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HourlyWeather from '@/components/HourlyWeather';
import TodayWeather from '@/components/TodayWeather';
import WeekWeather from '@/components/WeekWeather';
import Image from 'next/image';

// const options = { method: 'GET', headers: { accept: 'application/json' } };

export default async function Home() {
  const todayWeathers = await getTodayWeather();
  const hourlyWeathers = await getHourlyWeather();
  const weekWeathers = await getWeekWeather();

  return (
    <div className='h-screen text-black z-0 snap-y snap-mandatory overflow-y-scroll bg-slate-400'>
      {/* Header */}
      {/* <Header /> */}
      {/* Today Weather */}
      <section id='today' className='snap-start'>
        <TodayWeather promise={todayWeathers} />
      </section>
      <section className='mx-auto px-5 flex flex-col justify-center max-w-lg lg:max-w-screen-lg lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4'>
        <section id='hourly' className='snap-start'>
          <HourlyWeather promise={hourlyWeathers} />
        </section>
        {/* Week Weather */}
        <section id='week' className='snap-start lg:col-start-1'>
          <WeekWeather promise={weekWeathers} />
        </section>
        {/* Detail Weather */}
        <section
          id='detail'
          className='snap-start lg:row-start-1 lg:row-span-2 lg:col-start-2 lg:h-full'
        >
          <DetailWeather promise={weekWeathers} />
        </section>
      </section>
      
      {/* Footer */}
      {/* <Footer /> */}
      <section className='sticky bottom-0'>
        <Footer />
      </section>

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

  if (!res.ok) {
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