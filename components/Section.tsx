'use client';

import React, { useEffect, useState } from 'react';
import TodayWeather from './weather/TodayWeather';
import HourlyWeather from './weather/HourlyWeather';
import WeekWeather from './weather/WeekWeather';
import DetailWeather from './weather/DetailWeather';
import Footer from './Footer';
import Modal from './UI/Modal';
import { motion } from 'framer-motion';
import Splitter from './UI/Splitter';
import { useResizable } from 'react-resizable-layout';
import Image from 'next/image';
import { Spinner } from './UI/Spinner';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import Link from 'next/link';
import { FaVimeo } from '@react-icons/all-files/fa/FaVimeo';

export const dynamic = 'force-static'

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
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [todayWeather, setTodayWeather] = useState<any>(todayWeathers);
  const [hourlyWeather, setHourlyWeather] = useState<any>(hourlyWeathers);
  const [weekWeather, setWeekWeather] = useState<any>(weekWeathers);

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (window === undefined) return;
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
    setIsLoading(true);

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

    setIsLoading(false);
  };

  useEffect(() => {}, [isModalClicked]);
  return (
    <div
      id='main-section'
      className='w-screen min-h-full lg:flex lg:grow text-white overflow-y-scroll'
    >
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
        // id='main-section'
        className='w-full min-h-full lg:flex lg:flex-col lg:items-center relative overflow-y-scroll'
      >
        {isLoading && <Spinner />}
        {!isLoading && (
          <motion.div
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -1000, opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 1.3 }}
          >
            <section id='today' className='py-10'>
              <TodayWeather promise={todayWeather} other={weekWeather} />
            </section>
            <section className='mx-auto px-5 flex flex-col justify-center max-w-lg lg:max-w-screen-lg lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4 mb-32'>
              <section
                id='hourly'
                className='snap-start lg:row-end-1 lg:col-start-1 lg:col-end-3'
              >
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
            <section className='w-full h-30 flex flex-col justify-end items-center space-y-5 mb-5'>
              <div className='flex flex-col justify-between items-center space-y-2'>
                <div className='flex justify-between items-center space-x-3'>
                  <Link href='https://github.com/lunarmoon7'>
                    <FaGithub color='gray' size='30' />
                  </Link>
                  <Link href='https://velog.io/@49crehbgr'>
                    <FaVimeo color='gray' size='30' />
                  </Link>
                </div>
                <div className='text-gray-500'>
                  © 2023 Zentechie All Rights Reserved.
                </div>
              </div>
              <Image
                src='/images/thanksTo.svg'
                alt='thanks_to_Tomorrow.io'
                width={300}
                height={100}
              />
            </section>
          </motion.div>
        )}
        <Footer handleModal={handleModal} />
      </section>
    </div>
  );
}
