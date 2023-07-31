// 'use client';

import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { WeeklyItem } from './WeatherItem';

type Props = {};

dayjs.locale('ko'); // 한국어로 설정

const tzToWeek = (dt: string) => dayjs(dt).format('ddd');

export default async function WeekWeather({
  promise,
}: {
  promise: Promise<any>;
}) {

  const data = await promise;
  const weatherList = data.timelines.daily;
  
  return (
    <div className='relative flex flex-col space-y-5 mx-5 border rounded-xl py-3 pl-3'>
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