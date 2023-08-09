'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ListItem } from './WeatherItem';
import { AiOutlineRollback } from '@react-icons/all-files/ai/AiOutlineRollback';
import countriesData from '../data/country-lat-long.json';

type Props = {
  onClose: () => void;
  windowSize: number;
  className?: string;
  modalW?: number;
  isBottom: boolean;
};

export const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export default function Modal({
  onClose,
  windowSize,
  className,
  modalW,
  isBottom,
}: Props) {
  const handleOnClose = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<object>([]);

  const handleSearch = (e: any) => {
    const input = e.target.value.toLowerCase();
    const filteredCountries: any[] = countriesData.countries.filter((country) =>
      country.country.toLowerCase().startsWith(input)
    );
    setSearchTerm(input);
    if (input === '') setSearchResults([]);
    else setSearchResults(filteredCountries);
  };

  const handleClick = (city: any[]) => {
    setSelectedCity(city);
  };

  // localstorage에 선택한 도시 저장
  useEffect(() => {
    if (selectedCity) {
      const prevCities: string | null = localStorage.getItem('selectedCity');
      if (prevCities === null || prevCities === undefined) {
        localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
        return;
      } 

      let prevCitiesArr: any[] = JSON.parse(prevCities);
      prevCitiesArr.push(selectedCity);
      
      localStorage.setItem('selectedCity', JSON.stringify(prevCitiesArr));
    }
  }, [selectedCity]);
  
  //   exit를 적용하려면 상위 컴포넌트에서 AnimatePresence를 적용해야 한다.
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
            <ListItem
              location={'서울'}
              temp={'33'}
              minTemp={'22'}
              maxTemp={'35'}
            />
            <ListItem
              location={'서울'}
              temp={'33'}
              minTemp={'22'}
              maxTemp={'35'}
            />
            <ListItem
              location={'서울'}
              temp={'33'}
              minTemp={'22'}
              maxTemp={'35'}
            />
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
