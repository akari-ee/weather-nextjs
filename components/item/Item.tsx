import Image from 'next/image';
import React from 'react';

type Props = {
  time?: string;
  temp?: string;
  minTemp?: string;
  maxTemp?: string;
  iconPath: string;
};
type CityItemProps = {
  city: string;
  temp: string;
  minTemp: string;
  maxTemp: string;
  latitude: string;
  longitude: string;
  onClick: (city: string) => void;
};

export const HourlyItem = ({ time, temp, iconPath }: Props) => {
  return (
    <div className='min-w-fit flex flex-col justify-center items-center space-y-2 text-xl'>
      <div>{time}시</div>
      <Image src={iconPath} alt='icon' width={30} height={30} />
      <div>{temp}°</div>
    </div>
  );
};

export const WeeklyItem = ({ time, minTemp, maxTemp, iconPath }: Props) => {
  return (
    <div>
      <div className='flex justify-evenly mb-2'>
        <div className='w-1/5'>{time}</div>
        <div className='w-1/6'>
          <Image src={iconPath} alt='icon' width={20} height={20} />
        </div>
        <div className='w-3/5 flex justify-evenly items-center font-semibold'>
          <div className='text-gray-200'>{minTemp}</div>
          <div className='w-3/5 bg-black/20 rounded-full h-1 relative'>
            <div
              id='temp-graph'
              style={{
                width: `${((Number(maxTemp) + 20) / 55) * 100}%`,
              }}
              className={`absolute h-full rounded-full`}
            />
          </div>
          <div>{maxTemp}</div>
        </div>
      </div>
      <div className='border border-white/20' />
    </div>
  );
};

export const CityItem = ({
  city,
  temp,
  minTemp,
  maxTemp,
  onClick,
  latitude,
  longitude,
}: CityItemProps) => {
  return (
    <div
      id='city-item'
      className='h-32 flex justify-between p-5 shadow-lg rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
      onClick={() => {
        onClick(city);
      }}
    >
      <div className='font-semibold text-lg'>
        <span>{city}</span>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div className='font-light text-4xl'>{temp}°</div>
        <div className='flex justify-center self-end items-center space-x-3 font-medium text-sm'>
          <div>
            <span>최고:{maxTemp}°</span>
          </div>
          <div>
            <span>최저:{minTemp}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};
