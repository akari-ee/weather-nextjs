'use client';

import React, { use, useEffect } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
type Props = {};

export default function TodayWeather({ promise, other }:{ promise: any, other: any }) {
  const data = promise;
  const weather = data.data.values;
  const location = data.location.name;
  const temperature = weather.temperature;
  const maxTemperature = other.timelines.daily[1].values.temperatureMax.toFixed();
  const minTemperature = other.timelines.daily[1].values.temperatureMin.toFixed();
  
  return (
    <header className='mx-auto flex flex-col justify-center items-center z-20 text-center'>
      <p className='text-3xl pl-2'>나의 위치</p>
      <p className='text-sm'>{location}</p>
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
