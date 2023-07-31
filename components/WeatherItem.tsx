import React from 'react';

type Props = {
  time: string;
  temp?: string;
  minTemp?: string;
  maxTemp?: string;
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
    <div className='flex justify-evenly'>
      <div className='w-1/5'>{time}</div>
      <div className='w-1/5'>ICON</div>
      <div className='w-3/5 flex justify-evenly font-semibold'>
        <div className='text-gray-400'>{minTemp}</div>
        <div>막대기</div>
        <div>{maxTemp}</div>
      </div>
    </div>
  );
};
