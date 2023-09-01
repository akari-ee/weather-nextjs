// 'use client';

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { WeeklyItem } from '@/components/item/Item';
import { setWeatherPath } from '@/utils/handleWeatherDetail';

type Props = {};

dayjs.locale('ko'); // 한국어로 설정

const tzToWeek = (dt: string) => dayjs(dt).format('ddd');

export default function WeekWeather({ promise }: { promise: any }) {
  const data = promise;
  const weatherList = data.timelines.daily;

  return (
    <div className='relative h-full flex flex-col space-y-7 rounded-xl py-5 px-5 bg-[#2980b9]/30 shadow-lg'>
      <header className='text-sm font-semibold'>5일간의 날씨</header>
      {weatherList.map((weather: any) => (
        <WeeklyItem
          key={weather.time}
          time={tzToWeek(weather.time)}
          minTemp={weather.values.temperatureMin.toFixed()}
          maxTemp={weather.values.temperatureMax.toFixed()}
          iconPath={setWeatherPath(weather.values.weatherCodeMax)}
        />
      ))}
    </div>
  );
}
