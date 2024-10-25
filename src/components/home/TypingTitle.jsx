import React, { useState, useEffect } from 'react';
import '../../styles/TypingTitle.scss';

const TypingTitle = ({ title }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (index < title.length) {
      const randomDelay = Math.floor(Math.random() * (150 - 10 + 1)) + 50;

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
    <h1 className="h1-title">
      {restText}
      <span className="last-char">{lastChar}</span>
      <span className={`cursor ${isTypingDone ? 'blinking' : ''}`}>|</span>
    </h1>
  );
};

export default TypingTitle;
