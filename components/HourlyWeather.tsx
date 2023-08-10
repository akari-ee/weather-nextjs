import React from 'react';
import { HourlyItem } from './Item';
import dayjs from 'dayjs';

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
    <div className='relative h-full flex justify-start items-center space-x-10 overflow-x-scroll border rounded-xl p-5'>
      {weatherList.map((weather: any) => (
        <HourlyItem
          key={weather.time}
          time={tzToKST(weather.time)}
          temp={weather.values.temperature.toFixed()}
        />
      ))}
    </div>
  );
}
