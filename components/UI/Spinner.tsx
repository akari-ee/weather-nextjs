import { motion } from 'framer-motion';
export const Spinner = () => {
  return (
    <div className='w-20 h-20 flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <motion.img
        key='loading'
        src='/images/rain_heavy.svg'
        animate={{
          scale: [1, 1.3, 1.5, 1.3, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className=''
      />
    </div>
  );
};
