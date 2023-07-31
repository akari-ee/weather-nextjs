import React, { use, useEffect } from 'react';
import { useScroll } from 'framer-motion';
type Props = {};

export default async function TodayWeather({
  promise,
}: {
  promise: Promise<any>;
}) {
  const data = await promise;
  const weather = data.data.values;
  const location = data.location;
  const temperature = weather.temperature;
  const maxTemperature = (temperature + 3).toFixed();
  const minTemperature = (temperature - 5).toFixed();

  // const { scrollY } = useScroll();
  return (
    <header className='sticky top-0 py-10 mx-auto flex flex-col justify-center items-center z-20'>
      <p className='text-3xl'>나의 위치</p>
      <p className='text-sm'>{location.name}</p>
      <p className='text-7xl'>{temperature.toFixed()}</p>
      <p>흐림</p>
      <div className='flex space-x-3'>
        <p>
          최고:
          <span className='font-semibold'>{maxTemperature}</span>
        </p>
        <p>
          최저:
          <span className='font-semibold'>{minTemperature}</span>
        </p>
      </div>
    </header>
  );
}
