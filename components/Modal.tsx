'use client';

import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { CityItem } from './Item';
import { AiOutlineRollback } from '@react-icons/all-files/ai/AiOutlineRollback';
import countriesData from '../data/country-lat-long.json';
import { fetchWeekWeather } from '@/utils/fetchWeekWeather';
import { fetchTodayWeather } from '@/utils/fetchTodayWeather';
import { cn } from '@/utils/classExtend';
import { Dialog, Transition } from '@headlessui/react';

type Props = {
  onClose: () => void;
  windowSize: number;
  modalW?: number;
  isBottom: boolean;
  isOpen?: boolean;
  onClick: (city: string) => void;
};

export default function Modal({
  onClose,
  windowSize,
  modalW,
  isBottom,
  isOpen,
  onClick,
}: Props) {
  const handleOnClose = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색 바
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과
  const [storage, setStorage] = useState<any>(); // 저장된 도시 목록

  // 도시 검색 기능
  const handleSearch = (e: any) => {
    const input = e.target.value.toLowerCase();
    const filteredCountries: any[] = countriesData.countries.filter((country) =>
      country.country.toLowerCase().startsWith(input)
    );
    setSearchTerm(input);
    if (input !== '') setSearchResults(filteredCountries);
  };

  // 도시 선택 시 해당 도시 추가
  const handleClick = async (city: any) => {
    const notRealTimeData = await fetchWeekWeather(
      city.latitude,
      city.longitude
    );
    const realTimeData = await fetchTodayWeather(city.latitude, city.longitude);

    let curStorage = JSON.parse(localStorage.getItem('selectedCity')!);
    setSearchTerm('');
    setSearchResults([]);

    // 이미 추가된 도시인지 확인
    const alreadyExist = curStorage.some(
      (item: any) => item.country === city.country
    );
    if (alreadyExist) return; // 추가된 도시라면 추가하지 않음

    // 추가하지 않았을 경우 추가한다.
    curStorage.push({
      country: city.country,
      avgTemp: realTimeData.data.values.temperature.toFixed(),
      minTemp:
        notRealTimeData.timelines.daily[1].values.temperatureMin.toFixed(),
      maxTemp:
        notRealTimeData.timelines.daily[1].values.temperatureMax.toFixed(),
      latitude: city.latitude,
      longitude: city.longitude,
    });
    console.log('modal: ', city.latitude, city.longitude);
    localStorage.setItem('selectedCity', JSON.stringify(curStorage));
    setStorage(curStorage);
  };

  const onClickCityItem = (city: string) => {
    onClick(city);
  };

  // 첫 렌더링 시, 저장된 도시 목록 불러오기
  useEffect(() => {
    const curStorage = JSON.parse(localStorage.getItem('selectedCity')!);
    if (curStorage === null) {
      localStorage.setItem('selectedCity', JSON.stringify([]));
      return;
    }
    setStorage(curStorage);
  }, []);

  // 도시 선택 시, re-render
  useEffect(() => {}, [storage]);

  // exit를 적용하려면 상위 컴포넌트에서 AnimatePresence를 적용해야 한다.
  const bottomModalContent = (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-y-full'
                enterTo='translate-y-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-y-0'
                leaveTo='translate-y-full'
              >
                <Dialog.Panel className='relative w-screen'>
                  <div
                    id='modal-container'
                    className={cn(
                      'w-full h-screen lg:opacity-100 lg:block px-5 py-5 top-0 left-0 text-white overflow-y-scroll shrink-0 transition-all ease-in-out duration-300',
                      isBottom
                        ? 'absolute bg-[#324a5e]'
                        : 'z-[9999] bg-[#005aa7]/30',
                      isOpen
                        ? 'opacity-100 bottom-auto z-10'
                        : 'opacity-0 z-[-99]'
                    )}
                    style={!isBottom ? { width: modalW } : {}}
                  >
                    <div id='modal-wrapper'>
                      <div id='modal'>
                        <div id='modal-header' className='flex justify-end'>
                          <div
                            id='modal-close-btn'
                            className='cursor-pointer'
                            onClick={handleOnClose}
                          >
                            {windowSize < 1024 && (
                              <AiOutlineRollback size={25} color='white' />
                            )}
                          </div>
                        </div>
                        <div className='space-y-3 mb-10'>
                          <h3 className='text-3xl font-bold mb-5'>날씨</h3>
                          <div id='search-box' className='space-y-3 rounded-2xl'>
                            <input
                              type='text'
                              placeholder='도시 검색'
                              value={searchTerm}
                              onChange={handleSearch}
                              className='border border-gray-300 p-2 rounded-2xl block text-black w-full focus:outline-none '
                            />
                            <ul className='space-y-3 px-3'>
                              {searchResults.map((item) => (
                                <li
                                  key={item.country}
                                  className='cursor-pointer hover:text-gray-400'
                                  onClick={() => handleClick(item)}
                                >
                                  {item.country}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div id='modal-body' className='space-y-5'>
                          {storage &&
                            storage.map((city: any) => (
                              <CityItem
                                key={city.country}
                                city={city.country}
                                temp={city.avgTemp}
                                minTemp={city.minTemp}
                                maxTemp={city.maxTemp}
                                latitude={city.latitude}
                                longitude={city.longitude}
                                onClick={onClickCityItem}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
  const sideModalContent = (
    <div
      id='modal-container'
      className={cn(
        'w-full h-screen lg:opacity-100 lg:block px-5 py-5 top-0 left-0 text-white overflow-y-scroll shrink-0 transition-all ease-in-out duration-300',
        isBottom ? 'absolute bg-[#324a5e]' : 'z-[9999] bg-[#005aa7]/30',
        isOpen ? 'opacity-100 bottom-auto z-10' : 'opacity-0 z-[-99]'
      )}
      style={!isBottom ? { width: modalW } : {}}
    >
      <div id='modal-wrapper'>
        <div id='modal'>
          <div id='modal-header' className='flex justify-end'>
            <div
              id='modal-close-btn'
              className='cursor-pointer'
              onClick={handleOnClose}
            >
              {windowSize < 1024 && (
                <AiOutlineRollback size={25} color='white' />
              )}
            </div>
          </div>
          <div className='space-y-3 mb-10'>
            <h3 className='text-3xl font-bold mb-5'>날씨</h3>
            <div id='search-box' className='space-y-3'>
              <input
                type='text'
                placeholder='도시 검색'
                value={searchTerm}
                onChange={handleSearch}
                className='border border-gray-300 p-2 rounded block text-black w-full focus:outline-none'
              />
              <ul className='space-y-3 px-3'>
                {searchResults.map((item) => (
                  <li
                    key={item.country}
                    className='cursor-pointer hover:text-gray-400'
                    onClick={() => handleClick(item)}
                  >
                    {item.country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div id='modal-body' className='space-y-5'>
            {storage &&
              storage.map((city: any) => (
                <CityItem
                  key={city.country}
                  city={city.country}
                  temp={city.avgTemp}
                  minTemp={city.minTemp}
                  maxTemp={city.maxTemp}
                  latitude={city.latitude}
                  longitude={city.longitude}
                  onClick={onClickCityItem}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  return isBottom ? bottomModalContent : sideModalContent;
}
