import React from 'react';
import { HourlyItem } from './Item';
import dayjs from 'dayjs';
import { setWeatherPath } from '@/utils/handleWeatherDetail';

type Props = {
  time: string;
  temp: string;
};

function tzToKST(dt: string) {
  return dayjs(dt).format('HH');
}

export default function HourlyWeather({ promise }: { promise: any }) {
  const data = promise;
  const weatherList = data.timelines.hourly.slice(0, 25);
  return (
    <div className='relative h-full flex flex-col justify-between overflow-x-scroll rounded-xl p-8 bg-[#2980b9]/30 shadow-lg space-y-7'>
      <header className='text-sm font-semibold'>약 다음 1일간의 날씨</header>
      <div className='flex justify-start items-center space-x-10 overflow-x-scroll'>
        {weatherList.map((weather: any) => (
          <HourlyItem
            key={weather.time}
            time={tzToKST(weather.time)}
            temp={weather.values.temperature.toFixed()}
            iconPath={setWeatherPath(weather.values.weatherCode)}
          />
        ))}
      </div>
    </div>
  );
}
