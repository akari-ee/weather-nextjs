// 'use client';

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { WeeklyItem } from './WeatherItem';

type Props = {};

dayjs.locale('ko'); // 한국어로 설정

const tzToWeek = (dt: string) => dayjs(dt).format('ddd');

export default function WeekWeather({
  promise,
}: {
  promise: any;
}) {
  const data = promise;
  const weatherList = data.timelines.daily;
  
  return (
    <div className='relative h-full flex flex-col space-y-5 border rounded-xl py-3 px-3'>
      <header className='text-sm font-semibold'>5일간의 날씨</header>
      {weatherList.map((weather: any) => (
        <WeeklyItem
          key={weather.time}
          time={tzToWeek(weather.time)}
          minTemp={weather.values.temperatureMax.toFixed()}
          maxTemp={weather.values.temperatureMin.toFixed()}
        />
      ))}
    </div>
  );
}