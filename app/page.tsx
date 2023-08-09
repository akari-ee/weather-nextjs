import DetailWeather from '@/components/DetailWeather';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HourlyWeather from '@/components/HourlyWeather';
import Modal from '@/components/Modal';
import Section from '@/components/Section';
import Splitter from '@/components/Splitter';
import TodayWeather from '@/components/TodayWeather';
import { ListItem } from '@/components/WeatherItem';
import WeekWeather from '@/components/WeekWeather';
import { AnimatePresence } from 'framer-motion';
import { useResizable } from 'react-resizable-layout';

export default async function Home() {
  const todayWeathers = await getTodayWeather();
  const hourlyWeathers = await getHourlyWeather();
  const weekWeathers = await getWeekWeather();

  return (
    <div className='w-screen h-screen relative text-black z-0 snap-y snap-mandatory overflow-y-scroll bg-slate-400 lg:flex '>
      <Section
        todayWeathers={todayWeathers}
        hourlyWeathers={hourlyWeathers}
        weekWeathers={weekWeathers}
      />

      {/* Temporary Animated */}
      {/* <Section todayWeathers={todayWeathers} hourlyWeathers={hourlyWeathers} weekWeathers={weekWeathers} /> */}
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
