'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ListItem } from './WeatherItem';
import { AiOutlineRollback } from '@react-icons/all-files/ai/AiOutlineRollback';
type Props = {
  onClose?: () => void;
  windowSize?: number;
  className?: string;
  modalW: number;
};

export const cn = (...classes : any[]) => {
  return classes.filter(Boolean).join(' ');
}

export default function Modal({ onClose, windowSize, className, modalW }: Props) {
  const handleOnClose = (e: any) => {
    e.preventDefault();
    onClose();
  };
  
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
        className={cn('hidden lg:block lg:w-screen lg:h-screen lg:relative px-5 py-5 top-0 left-0 bg-black text-white overflow-y-scroll', className)}
        style={{width: modalW}}
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
              <div>검색바</div>
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

  // return ReactDOM.createPortal(
  //   modalContent,
  //   document.getElementById('modal-root') as HTMLElement
  // );
  return modalContent;
}
