import React, { useState, useEffect } from 'react';
import '../../styles/TypingTitle.scss';
import { motion } from 'framer-motion';

const TypingTitle = ({ title, controls }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (index < title.length) {
      const randomDelay = Math.floor(Math.random() * (150 - 30 + 1)) + 30;

      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + title[index]);
        setIndex(index + 1);

        if (index === title.length - 1) {
          setIsTypingDone(true);
        }
      }, randomDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [index, title]);

  const lastChar = displayedText.slice(-1);
  const restText = displayedText.slice(0, -1);

  return (
    <motion.div
      className='h1-title'
      initial={{ y: 0}}
      animate={controls}
    >
      {restText}
      <span className="last-char">{lastChar}</span>
      <span className={`cursor ${isTypingDone ? 'blinking' : ''}`}>|</span>
    </motion.div>

  );
};

export default TypingTitle;
