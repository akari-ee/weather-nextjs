'use client'

import React from 'react';
import Header from './Header';
import TodayWeather from './TodayWeather';
import HourlyWeather from './HourlyWeather';
import WeekWeather from './WeekWeather';
import DetailWeather from './DetailWeather';
import Footer from './Footer';
import { motion } from 'framer-motion';
type Props = {};

export default function Section({
  todayWeathers,
  hourlyWeathers,
  weekWeathers,
}: {
  todayWeathers: any;
  hourlyWeathers: any;
  weekWeathers: any;
}) {
  return (
    <motion.div>
      <Header />
      {/* Today Weather */}
      <section id='today' className='snap-start scroll-my-10 my-10'>
        <TodayWeather promise={todayWeathers} other={weekWeathers} />
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
      <Footer />
    </motion.div>
  );
}
