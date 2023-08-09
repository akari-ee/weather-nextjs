'use client';

import React, { useEffect, useState } from 'react';
import { BsCardList } from '@react-icons/all-files/bs/BsCardList';
import { AnimatePresence } from 'framer-motion';
import Modal from './Modal';

type Props = {};

export default function Header({}: Props) {
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
    <div className='hidden lg:block lg:pl-5 pt-5 text-white '>
      <div className='cursor-pointer' onClick={() => setShowModal(prev => !prev)}>
        <BsCardList size={30} />
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
    </div>
  );
}
