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
import Splitter from './Splitter';
import { useResizable } from 'react-resizable-layout';
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
  const {
    isDragging: isModalDragging,
    position: modalW,
    splitterProps: modalDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: 300,
    min: 300,
    max: 400,
  });

  const [showModal, setShowModal] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  return (
    <div className='w-full lg:flex lg:grow'>
      {windowSize > 1024 && (
        <Modal
          className='shrink-0 contents'
          modalW={modalW}
          onClose={() => {
            setShowModal(false);
          }}
          windowSize={windowSize}
          isBottom={false}
        />
      )}
      <Splitter isDragging={isModalDragging} {...modalDragBarProps} />
      <section id='content-wrapper' className='flex flex-col grow'>
        <section id='today' className='snap-start scroll-my-10 my-10'>
          <TodayWeather promise={todayWeathers} other={weekWeathers} />
        </section>
        <section className='mx-auto px-5 flex flex-col justify-center max-w-lg lg:max-w-screen-lg lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4'>
          <section id='hourly' className='snap-start'>
            <HourlyWeather promise={hourlyWeathers} />
          </section>
          <section id='week' className='snap-start lg:col-start-1'>
            <WeekWeather promise={weekWeathers} />
          </section>
          <section
            id='detail'
            className='snap-start lg:row-start-1 lg:row-span-2 lg:col-start-2 lg:h-full'
          >
            <DetailWeather promise={weekWeathers} />
          </section>
        </section>
        <Footer />
      </section>
    </div>
  );
}
