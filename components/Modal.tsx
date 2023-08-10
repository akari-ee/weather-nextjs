'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CityItem } from './Item';
import { AiOutlineRollback } from '@react-icons/all-files/ai/AiOutlineRollback';
import countriesData from '../data/country-lat-long.json';

type Props = {
  onClose: () => void;
  windowSize: number;
  className?: string;
  modalW?: number;
  isBottom: boolean;
  // savedCities: any[] | null;
};

export const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export default function Modal({
  onClose,
  windowSize,
  className,
  modalW,
  isBottom, // savedCities,
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
  const handleClick = (city: any) => {
    let curStorage = JSON.parse(localStorage.getItem('selectedCity')!);
    setSearchTerm('');
    setSearchResults([]);

    // 이미 추가된 도시인지 확인
    const alreadyExist = curStorage.some(
      (item: any) => item.country === city.country
    );
    if (alreadyExist) return; // 추가된 도시라면 추가하지 않음

    // 추가하지 않았을 경우 추가한다.
    curStorage.push(city);
    localStorage.setItem('selectedCity', JSON.stringify(curStorage));
    setStorage(curStorage);
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
  const modalContent = (
    <div
      // initial={
      //   windowSize < 1024 ? { y: 200, opacity: 0 } : { x: -200, opacity: 0 }
      // }
      // whileInView={
      //   windowSize < 1024 ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }
      // }
      // exit={
      //   windowSize < 1024 ? { y: 200, opacity: 0 } : { x: -200, opacity: 0 }
      // }
      // transition={{ ease: 'easeInOut', duration: 0.5 }}
      // id='modal-overlay'
      className={cn(
        'w-screen h-screen lg:block px-5 py-5 top-0 left-0 bg-black text-white overflow-y-scroll',
        className,
        isBottom ? 'absolute' : ''
      )}
      style={{ width: modalW }}
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
          <div className='space-y-3 mb-3'>
            <h3 className='text-3xl font-bold'>날씨</h3>
            <div id='search-box' className='space-y-3'>
              <input
                type='text'
                placeholder='Search'
                value={searchTerm}
                onChange={handleSearch}
                className='border border-gray-300 p-2 rounded block text-black w-full'
              />
              <ul className='space-y-3 px-3'>
                {searchResults.map((item) => (
                  <li
                    key={item.country}
                    className='cursor-pointer hover:text-gray-400'
                    onClick={() => handleClick(item)}
                  >
                    {item.country} - {item.latitude} - {item.longitude}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div id='modal-body' className='space-y-2'>
            {storage &&
              storage.map((city: any) => (
                <CityItem
                  key={city.country}
                  city={city.country}
                  temp={'0'}
                  minTemp={'0'}
                  maxTemp={'0'}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  return isBottom
    ? ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root') as HTMLElement
      )
    : modalContent;
}
