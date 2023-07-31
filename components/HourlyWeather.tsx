import React from 'react';
import { HourlyItem } from './WeatherItem';
import dayjs from 'dayjs';

type Props = {
  time: string;
  temp: string;
};

function tzToKST(dt: string) {
  return dayjs(dt).format('HH');
}

export default async function HourlyWeather({ promise }: { promise: Promise<any> }) {
  const data = await promise;
  const weatherList = data.timelines.hourly.slice(0, 25);

  return (
    <div className='relative flex space-x-10 overflow-x-scroll mx-5 border rounded-xl p-5 mb-5'>
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
