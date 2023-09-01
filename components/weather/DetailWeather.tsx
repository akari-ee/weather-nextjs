import React from 'react';
import dayjs from 'dayjs';
import { FiSunset } from '@react-icons/all-files/fi/FiSunset';
import { FiSunrise } from '@react-icons/all-files/fi/FiSunrise';
import { FiCloudRain } from '@react-icons/all-files/fi/FiCloudRain';
import { FaTemperatureHigh } from '@react-icons/all-files/fa/FaTemperatureHigh';
import { MdVisibility } from '@react-icons/all-files/md/MdVisibility';
import { WiHumidity } from '@react-icons/all-files/wi/WiHumidity';
import { FiSun } from '@react-icons/all-files/fi/FiSun';
import { BsGraphUp } from '@react-icons/all-files/bs/BsGraphUp';
import { GiOppression } from '@react-icons/all-files/gi/GiOppression';
import { setVisibilityDescription } from '@/utils/handleWeatherDetail';


function tzToKST(dt: string) {
  return dayjs(dt).format('HH:mm');
}
const handleUvIndexStep = (uvIndex: number) => {
  if (uvIndex <= 2) return '낮음';
  else if (uvIndex <= 5) return '보통';
  else if (uvIndex <= 7) return '높음';
  else if (uvIndex <= 10) return '매우 높음';
  else return '위험';
};

const handleUvIndexInstruction = (uvIndex: number) => {
  if (uvIndex <= 2) return '남은 하루동안 자외선 지수가 낮겠습니다.';
  else if (uvIndex <= 5) return '남은 하루동안 자외선 지수가 보통입니다.';
  else if (uvIndex <= 7) return '남은 하루동안 자외선 지수가 높습니다.';
  else if (uvIndex <= 10) return '남은 하루동안 자외선 지수가 매우 높습니다.';
  else return '남은 하루동안 자외선 지수가 위험합니다';
};

export default function DetailWeather({ promise }: { promise: any }) {
  const weather = promise.timelines.daily[1].values;
  const avgTemp = (weather.temperatureAvg - weather.temperatureMax).toFixed();
  const [uvIndexStep, setUvIndexStep] = React.useState<string>(
    handleUvIndexStep(weather.uvIndexAvg)
  );

  return (
    <div className='rounded-xl grid grid-cols-2 gap-3 z-0 h-full'>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30 shadow-lg'>
        <div>
          <div className='flex justify-center items-center space-x-2 mb-3'>
            <BsGraphUp
              color='rgb(255, 255, 255, 0.7)'
              fill='rgb(255, 255, 255, 0.7)'
            />
            <span className='text-white/70 text-sm'>평균</span>
          </div>
        </div>
        <div className='text-3xl font-medium'>{avgTemp}°</div>
        <div className='text-lg font-medium mb-2'>
          {avgTemp <= '0' ? '평균보다 낮음' : '평균보다 높음'}
        </div>
        <div>
          <div className='space-x-1'>
            <span className='font-semibold'>
              {weather.temperatureAvg.toFixed()}°
            </span>
            <span className='text-white/70 text-sm'>평균 최고 기온</span>
          </div>
          <div className='space-x-1'>
            <span className='font-semibold'>
              {weather.temperatureMax.toFixed()}°
            </span>
            <span className='text-white/70 text-sm'>오늘 최고 기온</span>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30 shadow-lg'>
        <div>
          <div className='flex justify-center items-center space-x-2 mb-3'>
            <FiSun
              color='rgb(255, 255, 255, 0.7)'
              fill='rgb(255, 255, 255, 0.7)'
            />
            <span className='text-sm text-white/70'>자외선 지수</span>
          </div>
        </div>
        <div className='text-3xl'>{weather.uvIndexAvg}</div>
        <div className='text-xl mb-3'>{uvIndexStep}</div>
        <div
          id='temp-graph'
          className='w-full bg-black/20 rounded-full h-2 relative mb-3'
        >
          <div
            style={{ left: `${weather.uvIndexAvg * 7}%` }}
            className='absolute w-2 h-2 border-2 border-double border-black/40 rounded-full bg-white'
          />
        </div>
        <div className='text-sm'>
          {handleUvIndexInstruction(weather.uvIndexAvg)}
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30 shadow-lg'>
        <div>
          <div className='space-y-3'>
            <div className='flex items-center  space-x-2 mb-3'>
              <FiSunrise
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>일출</span>
            </div>
            <div className='font-semibold text-3xl space-x-1'>
              <span>{tzToKST(weather.sunriseTime)}</span>
              <span className='text-lg'>am</span>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30  shadow-lg'>
        <div>
          <div className='space-y-3'>
            <div className='flex items-center  space-x-2 mb-3'>
              <FiSunset
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>일몰</span>
            </div>
            <div className='font-semibold text-3xl space-x-1'>
              <span>{tzToKST(weather.sunsetTime)}</span>
              <span className='text-lg'>pm</span>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30  shadow-lg'>
        <div>
          <div className='space-y-3'>
            <div className='flex justify items-center space-x-2 mb-3'>
              <FaTemperatureHigh
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>체감 온도</span>
            </div>
            <div>
              <div className='font-semibold text-3xl'>
                {weather.temperatureApparentAvg.toFixed()}°
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30  shadow-lg'>
        <div>
          <div className='space-y-3'>
            <div className='flex justify items-center space-x-2 mb-3'>
              <FiCloudRain
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>강수량</span>
            </div>
            <div className='font-semibold text-3xl'>
              {weather.rainAccumulationAvg}mm
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30  shadow-lg'>
        <div className='w-full h-full'>
          <div className='space-y-3 flex flex-col justify-between w=full h-full'>
            <div className='flex items-center  space-x-2 mb-3'>
              <MdVisibility
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>가시거리</span>
            </div>
            <div className='font-semibold text-3xl grow'>
              {weather.visibilityAvg.toFixed()}km
            </div>
            <div>{setVisibilityDescription(weather.visibilityAvg)}</div>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30 shadow-lg'>
        <div>
          <div className='space-y-3'>
            <div className='flex items-center space-x-2 mb-3'>
              <WiHumidity
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>습도</span>
            </div>
            <div className='font-semibold text-3xl'>
              {weather.humidityAvg.toFixed()}%
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-xl w-[100%] p-3 flex flex-col justify-between items-start bg-[#2980b9]/30 shadow-lg'>
        <div>
          <div className='space-y-3'>
            <div className='flex items-center space-x-2 mb-3'>
              <GiOppression
                color='rgb(255, 255, 255, 0.7)'
                fill='rgb(255, 255, 255, 0.7)'
              />
              <span className='text-sm text-white/70'>기압</span>
            </div>
            <div className='font-semibold text-3xl'>
              {weather.pressureSurfaceLevelAvg.toFixed()}hPa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
