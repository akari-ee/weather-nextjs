'use client';

import React, { useEffect, useState } from 'react';
import TodayWeather from './TodayWeather';
import HourlyWeather from './HourlyWeather';
import WeekWeather from './WeekWeather';
import DetailWeather from './DetailWeather';
import Footer from './Footer';
import Modal from './Modal';
import { motion } from 'framer-motion';
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
  const [isModalClicked, setIsModalClicked] = useState(false);

  const [todayWeather, setTodayWeather] = useState<any>(todayWeathers);
  const [hourlyWeather, setHourlyWeather] = useState<any>(hourlyWeathers);
  const [weekWeather, setWeekWeather] = useState<any>(weekWeathers);

  const handleModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude: latitude, longitude: longitude });
      });
    }
  }, []);

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

  const onClickModalItem = async (city: string) => {
    const todayRes = await fetch(`/api/getTodayWeather?city=${city}`);
    const hourlyRes = await fetch(`/api/getHourlyWeather?city=${city}`);
    const weekRes = await fetch(`/api/getWeekWeather?city=${city}`);

    const todayData = await todayRes.json();
    const hourlyData = await hourlyRes.json();
    const weekData = await weekRes.json();

    todayWeathers = todayData.data;
    hourlyWeathers = hourlyData.data;
    weekWeathers = weekData.data;

    setTodayWeather(todayWeathers);
    setHourlyWeather(hourlyWeathers);
    setWeekWeather(weekWeathers);
    setIsModalClicked((prev) => !prev);
  };

  useEffect(() => {
    // 값이 변경될 때마다 animate 속성을 업데이트
  }, [isModalClicked]);

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
          onClick={onClickModalItem}
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
          onClick={onClickModalItem}
        />
      )}
      <Splitter isDragging={isModalDragging} {...modalDragBarProps} />
      <section
        id='content-wrapper'
        className='w-full max-h-screen snap-y snap-mandatory overflow-y-scroll lg:flex lg:flex-col lg:grow lg:justify-center lg:items-center'
      >
        <motion.div
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -1000, opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 1.3 }}
        >
          <section id='today' className='snap-start scroll-my-10 my-10'>
            <TodayWeather promise={todayWeather} other={weekWeather} />
          </section>
          <section className='mx-auto px-5 flex flex-col justify-center max-w-lg lg:max-w-screen-lg lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4'>
            <section id='hourly' className='snap-start'>
              <HourlyWeather promise={hourlyWeather} />
            </section>
            <section id='week' className='snap-start lg:col-start-1'>
              <WeekWeather promise={weekWeather} />
            </section>
            <section
              id='detail'
              className='snap-start lg:row-start-1 lg:row-span-2 lg:col-start-2 lg:h-full'
            >
              <DetailWeather promise={weekWeather} />
            </section>
          </section>
        </motion.div>

        <Footer handleModal={handleModal} />
      </section>
    </div>
  );
}
