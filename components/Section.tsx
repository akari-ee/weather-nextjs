'use client';

import React, { useEffect, useState } from 'react';
import TodayWeather from './TodayWeather';
import HourlyWeather from './HourlyWeather';
import WeekWeather from './WeekWeather';
import DetailWeather from './DetailWeather';
import Footer from './Footer';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from './Modal';

import { BsCardList } from '@react-icons/all-files/bs/BsCardList';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import { ImMap2 } from '@react-icons/all-files/im/ImMap2';
type Props = {};

export default function Section({
  todayWeathers,
  hourlyWeathers,
  weekWeathers,
}: {
  todayWeathers: any;
  hourlyWeathers: any;
  weekWeathers: any;
}) {
  const [showModal, setShowModal] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    console.log(windowSize);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={showModal ? { x: 0 } : { x: 0 }}
      exit={{ x: 0 }}
      transition={{ duration: 1 }}
      className='relative w-full'
    >
      <div className='hidden lg:block lg:pl-5 pt-5 text-white '>
        <div
          className='cursor-pointer'
          onClick={() => setShowModal((prev) => !prev)}
        >
          <BsCardList size={30} />
        </div>
      </div>

      {/* Today Weather */}
      <section id='today' className='snap-start scroll-my-10 my-10'>
        <TodayWeather promise={todayWeathers} other={weekWeathers} />
      </section>
      <section className='mx-auto px-5 flex flex-col justify-center max-w-lg lg:max-w-screen-lg lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4'>
        <section id='hourly' className='snap-start'>
          <HourlyWeather promise={hourlyWeathers} />
        </section>
        {/* Week Weather */}
        <section id='week' className='snap-start lg:col-start-1'>
          <WeekWeather promise={weekWeathers} />
        </section>
        {/* Detail Weather */}
        <section
          id='detail'
          className='snap-start lg:row-start-1 lg:row-span-2 lg:col-start-2 lg:h-full'
        >
          <DetailWeather promise={weekWeathers} />
        </section>
      </section>
      {/* Footer */}
      <div className='sticky bottom-0 flex justify-between items-center z-20 bg-slate-400 text-2xl px-5 py-2 lg:mt-5 lg:hidden'>
        <div className='cursor-pointer'>
          <ImMap2 size={23} />
        </div>
        <div>슬라이더</div>
        <div className='cursor-pointer' onClick={() => setShowModal(true)}>
          <AiOutlineUnorderedList size={25} />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
            }}
            windowSize={windowSize}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
