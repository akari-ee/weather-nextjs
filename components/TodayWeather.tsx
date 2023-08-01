'use client';

import React, { use, useEffect } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
type Props = {};

export default function TodayWeather({ promise }: { promise: any }) {
  const data = promise;
  const weather = data.data.values;
  const location = data.location;
  const temperature = weather.temperature;
  const maxTemperature = (temperature + 3).toFixed();
  const minTemperature = (temperature - 5).toFixed();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('Page scroll: ', latest);
  });
  return (
    <header className='mx-auto flex flex-col justify-center items-center z-20 text-center'>
      <p className='text-3xl pl-2'>나의 위치</p>
      <p className='text-sm'>{location.name}</p>
      <p className='text-7xl pl-5'>{temperature.toFixed()}°</p>
      <p>흐림</p>
      <div className='flex space-x-3'>
        <p>
          최고:
          <span className='font-semibold'>{maxTemperature}°</span>
        </p>
        <p>
          최저:
          <span className='font-semibold'>{minTemperature}°</span>
        </p>
      </div>
    </header>
  );
}
