'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import { ImMap2 } from '@react-icons/all-files/im/ImMap2';
import Modal from './Modal';
import { time } from 'console';
import { AnimatePresence } from 'framer-motion';
type FooterProps = {
  handleModal: () => void;
};

export default function Footer({ handleModal }: FooterProps) {
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
    <div id='footer' className='sticky bottom-0 flex justify-between items-center text-2xl px-5 py-2 lg:mt-5 lg:hidden'>
      <div className='cursor-pointer'>
        <ImMap2 size={23} />
      </div>
      <div>슬라이더</div>
      <div className='cursor-pointer' onClick={() => handleModal()}>
        <AiOutlineUnorderedList size={25} />
      </div>
    </div>
  );
}
