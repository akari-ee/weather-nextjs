import React from 'react';
import dayjs from 'dayjs';

type Props = {};

function tzToKST(dt: string) {
  return dayjs(dt).format('HH:mm');
}

export default function DetailWeather({ promise }: { promise: any }) {
  const weather = promise.timelines.daily[1].values;
  const avgTemp = (weather.temperatureAvg - weather.temperatureMax).toFixed();

  return (
    <div className='border rounded-xl border-gray-500 grid grid-cols-2 gap-3 z-0 h-full'>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700 text-sm'>
          <span>평균</span>
        </div>
        <div className='text-3xl font-medium'>{avgTemp}°</div>
        <div className='text-lg font-medium mb-2'>
          {avgTemp <= '0' ? '평균보다 낮음' : '평균보다 높음'}
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>
            {weather.temperatureAvg.toFixed()}°
          </span>
          <span>평균 최고 기온</span>
        </div>
        <div className='space-x-1'>
          <span className='font-semibold'>
            {weather.temperatureMax.toFixed()}°
          </span>
          <span>오늘 최고 기온</span>
        </div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>자외선 지수</span>
        </div>
        <div className='font-semibold'>{weather.uvIndexAvg}</div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>일출</span>
        </div>
        <div className='font-semibold'>{tzToKST(weather.sunriseTime)}</div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>일몰</span>
        </div>
        <div className='font-semibold'>{tzToKST(weather.sunsetTime)}</div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>체감 온도</span>
        </div>
        <div className='font-semibold'>
          {weather.temperatureApparentAvg.toFixed()}°
        </div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>강수량</span>
        </div>
        <div className='font-semibold'>{weather.rainAccumulationAvg}mm</div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>가시거리</span>
        </div>
        <div className='font-semibold'>{weather.visibilityAvg.toFixed()}km</div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>습도</span>
        </div>
        <div className='font-semibold'>{weather.humidityAvg.toFixed()}%</div>
      </div>
      <div className='border rounded-xl w-[100%] p-3 flex flex-col justify-center items-start'>
        <div className='text-gray-700'>
          <span className='text-sm'>기압</span>
        </div>
        <div className='font-semibold'>
          {weather.pressureSurfaceLevelAvg.toFixed()}hPa
        </div>
      </div>
      {/* <DetailItem type={'uv'} title={'자외선'} />
      <DetailItem type={'visibility'} title={'가시거리'} />
      <DetailItem type={'sunrise'} title={'일출'} />
      <DetailItem type={'sunset'} title={'일몰'} />
      <DetailItem type={'apparent'} title={'체감온도'} />
      <DetailItem type={'humdity'} title={'습도'} />
      <DetailItem type={'pressure'} title={'기압'} /> */}
    </div>
  );
}
