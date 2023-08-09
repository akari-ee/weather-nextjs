'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import { ImMap2 } from '@react-icons/all-files/im/ImMap2';
import Modal from './Modal';
import { time } from 'console';
import { AnimatePresence } from 'framer-motion';
type Props = {};

export default function Footer({}: Props) {
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
    <div className='sticky bottom-0 flex justify-between items-center z-20 bg-slate-400 text-2xl px-5 py-2 lg:mt-5 lg:hidden'>
      <div className='cursor-pointer'>
        <ImMap2 size={23} />
      </div>
      <div>슬라이더</div>
      <div className='cursor-pointer' onClick={() => setShowModal(true)}>
        <AiOutlineUnorderedList size={25} />
      </div>
      
      <AnimatePresence>
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
            }}
            windowSize={windowSize}
            isBottom={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
