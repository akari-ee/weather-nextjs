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
type Location = {
  latitude?: number;
  longitude?: number;
};

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
    initial: 400,
    min: 400,
    max: 500,
  });

  const [showModal, setShowModal] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [location, setLocation] = useState<Location>({});

  const handleModal = () => {
    setShowModal(true);
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude: latitude, longitude: longitude });
      });
    }
  }, []);
  useEffect(() => {
    console.log(location);
  }, [location]);

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
    <div className='w-screen min-h-full relative lg:flex lg:grow overflow-hidden'>
      {windowSize > 1024 ? (
        <Modal
          modalW={modalW}
          onClose={() => {
            setShowModal(false);
          }}
          windowSize={windowSize}
          isBottom={false}
        />
      ) : (
        <Modal
          modalW={modalW}
          onClose={() => {
            setShowModal(false);
          }}
          windowSize={windowSize}
          isBottom={true}
          isOpen={showModal}
        />
      )}
      <Splitter isDragging={isModalDragging} {...modalDragBarProps} />
      <section
        id='content-wrapper'
        className='w-full max-h-screen snap-y snap-mandatory overflow-y-scroll lg:flex lg:flex-col lg:grow lg:justify-center lg:items-center'
      >
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
        <Footer handleModal={handleModal}/>
      </section>
    </div>
  );
}
