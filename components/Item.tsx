import React from 'react';

type Props = {
  time?: string;
  temp?: string;
  minTemp?: string;
  maxTemp?: string;
};
type ListProps = {
  city: string;
  temp: string;
  minTemp: string;
  maxTemp: string;
};

export const HourlyItem = ({ time, temp }: Props) => {
  return (
    <div className='h-full min-w-fit flex flex-col justify-center items-center space-y-2'>
      <div>{time}시</div>
      <div>ICON</div>
      <div className='font-semibold'>{temp}</div>
    </div>
  );
};

export const WeeklyItem = ({ time, minTemp, maxTemp }: Props) => {
  return (
    <div className='flex justify-evenly border border-x-0  border-y-0 border-b-2'>
      <div className='w-1/5'>{time}</div>
      <div className='w-1/5'>ICON</div>
      <div className='w-3/5 flex justify-evenly font-semibold'>
        <div className='text-gray-700'>{minTemp}</div>
        <div>막대기</div>
        <div>{maxTemp}</div>
      </div>
    </div>
  );
};

export const CityItem = ({ city, temp, minTemp, maxTemp }: ListProps) => {
  return (
    <div className='h-32 flex justify-between p-3 border border-gray-700 rounded-3xl cursor-pointer'>
      <div className='font-semibold text-lg'>
        <span>{city}</span>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div className='font-light text-4xl'>{temp}</div>
        <div className='flex justify-center self-end items-center space-x-3 font-medium text-sm'>
          <div>
            <span>최고:{maxTemp}</span>
          </div>
          <div>
            <span>최저:{minTemp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
